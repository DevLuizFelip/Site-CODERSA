import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro, Arrow } from '../site/Sections';
import { channels } from '../site/channels';
import { validateContact, sendContact } from '../site/contact-service';
import { trackEvent } from '../site/analytics';

export default function ContactPage() {
  const [values, setValues] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [failure, setFailure] = useState('');
  const [ready, setReady] = useState(false);
  const busy = useRef(false);
  const request = useRef(null);
  const successHeading = useRef(null);
  const form = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { if (status === 'success') successHeading.current?.focus(); }, [status]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy.current) return;
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current?.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    busy.current = true;
    setStatus('sending');
    setFailure('');
    request.current = new AbortController();
    try {
      await sendContact(values, { signal: request.current.signal });
      setStatus('success');
      trackEvent('contact_submit_success', { route: '/contato', source: 'contact-form' });
    } catch (error) {
      if (request.current?.signal.aborted) return;
      setStatus('error');
      setFailure(error.reason === 'timeout' ? 'O serviço demorou para responder. Seus dados continuam aqui; tente novamente.' : 'Não foi possível confirmar o envio. Confira sua conexão e tente novamente.');
      trackEvent('contact_submit_error', { route: '/contato', source: 'contact-form', reason: error.reason });
    } finally { busy.current = false; }
  }
  const update = event => {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors(previous => ({ ...previous, [name]: undefined }));
  };
  const fields = [{ name: 'nome', label: 'Nome', type: 'text', autoComplete: 'name', placeholder: 'Como podemos chamar você?' }, { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'nome@empresa.com' }, { name: 'assunto', label: 'Assunto', type: 'text', placeholder: 'Novo projeto, integração ou suporte' }];
  return <><PageIntro eyebrow="CONTATO" title="Vamos entender" accent="o seu processo.">Conte quais ferramentas estão envolvidas e onde o trabalho costuma parar. Para suporte, identifique o projeto no assunto.</PageIntro><section className="contact-grid section-pad">
    <div>{status === 'success' ? <div className="form-message success-message"><span className="success-symbol" aria-hidden="true">✓</span><h2 ref={successHeading} tabIndex="-1">Solicitação recebida.</h2><p>O serviço confirmou o recebimento da sua mensagem. Você pode continuar a conversa pelo WhatsApp, se preferir.</p><div className="success-actions"><a className="button primary" href={channels.whatsapp} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <Arrow/></a><Link className="text-link" to="/">Voltar ao início <Arrow/></Link></div></div> :
    <form ref={form} className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === 'sending'}>
      {fields.map(field => <div className="field" key={field.name}><label htmlFor={field.name}>{field.label} <span aria-hidden="true">*</span></label><input {...field} id={field.name} value={values[field.name]} onChange={update} required maxLength={field.name === 'email' ? 254 : 180} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}/>{errors[field.name] && <p id={`${field.name}-error`} className="field-error">{errors[field.name]}</p>}</div>)}
      <div className="field"><label htmlFor="mensagem">Descrição do processo ou solicitação <span aria-hidden="true">*</span></label><textarea id="mensagem" name="mensagem" value={values.mensagem} onChange={update} required maxLength={6000} rows={6} placeholder="De onde a informação vem? Por quais ferramentas passa? O que precisa melhorar?" aria-invalid={Boolean(errors.mensagem)} aria-describedby={errors.mensagem ? 'mensagem-error' : 'contact-privacy'}/>{errors.mensagem && <p id="mensagem-error" className="field-error">{errors.mensagem}</p>}</div>
      <p className="form-note" id="contact-privacy">Todos os campos são obrigatórios. Usaremos os dados informados para responder a esta solicitação. Evite incluir senhas ou informações sensíveis.</p>
      {failure && <div className="form-message" role="alert">{failure}</div>}
      <noscript><p>Ative JavaScript para enviar o formulário ou use os canais de contato ao lado.</p></noscript>
      <button className="button primary" type="submit" disabled={!ready || status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitação'}<Arrow/></button><span className="sr-only" role="status">{status === 'sending' ? 'Enviando sua solicitação.' : ''}</span>
    </form>}</div>
    <aside className="contact-channels"><p className="eyebrow">CONVERSA DIRETA</p><h2>Vendas e suporte.</h2><p>Os mesmos canais atendem novos projetos e suporte. Informe a finalidade e o nome do projeto no assunto ou na mensagem.</p><a className="channel-link" href={`mailto:${channels.email}`}><span>E-mail<small>{channels.email}</small></span><Arrow/></a><a className="channel-link" href={channels.whatsapp} target="_blank" rel="noopener noreferrer"><span>WhatsApp<small>{channels.phoneLabel}</small></span><Arrow/></a><a className="channel-link" href={channels.scheduling} target="_blank" rel="noopener noreferrer"><span>Agendar uma conversa<small>Consulte os horários disponíveis</small></span><Arrow/></a><p className="form-note">O escopo, os próximos passos e as condições de atendimento são alinhados na conversa.</p></aside>
  </section></>;
}
