import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import { PageIntro } from '../site/Sections';
export default function LeaveReviewPage() {
  const [values, setValues] = useState({ client_name: '', company_position: '', quote: '' });
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const busy = useRef(false);
  const heading = useRef(null);
  useEffect(() => { if (status === 'success') heading.current?.focus(); }, [status]);
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setStatus('sending'); setError('');
    try {
      const { error: issue } = await supabase.from('testimonials').insert([{ ...values, rating: Number(rating), is_approved: false }]);
      if (issue) throw issue;
      setStatus('success');
    } catch { setError('Não foi possível enviar sua avaliação. Seus dados foram mantidos para tentar novamente.'); setStatus('error'); }
    finally { busy.current = false; }
  }
  return <><PageIntro eyebrow="SUA EXPERIÊNCIA" title="Conte como foi" accent="trabalhar com a CODERSA.">Sua avaliação será analisada antes de ser publicada.</PageIntro><section className="section-pad">{status === 'success' ? <div className="form-message success-message"><h2 ref={heading} tabIndex="-1">Obrigado pela avaliação.</h2><p>Ela foi enviada e será analisada pela equipe.</p></div> : <form className="contact-form review-form" onSubmit={submit}><fieldset className="rating-options"><legend>Sua nota (obrigatória)</legend>{[1,2,3,4,5].map(value => <label key={value}><input type="radio" name="rating" value={value} checked={rating === String(value)} onChange={event => setRating(event.target.value)} required disabled={status === 'sending'}/>{value} {value === 1 ? 'estrela' : 'estrelas'}</label>)}</fieldset>{[['client_name','Seu nome'],['company_position','Cargo e empresa'],['quote','Sua avaliação']].map(([name,label]) => <div className="field" key={name}><label htmlFor={name}>{label}</label>{name === 'quote' ? <textarea id={name} name={name} value={values[name]} onChange={event=>setValues(previous=>({...previous,[name]:event.target.value}))} required disabled={status==='sending'} rows={6}/> : <input id={name} name={name} value={values[name]} onChange={event=>setValues(previous=>({...previous,[name]:event.target.value}))} required disabled={status==='sending'}/>}</div>)}{error&&<p className="form-message" role="alert">{error}</p>}<button type="submit" className="button primary" disabled={status==='sending'}>{status==='sending'?'Enviando…':'Enviar avaliação'}</button></form>}</section></>;
}
