import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';

const SecurityPage = () => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(true);

    // Verifica se o usuário já tem 2FA habilitado
    useEffect(() => {
        async function checkMFA() {
            const { data, error } = await supabase.auth.mfa.listFactors();
            if (data?.totp?.length > 0) setIsEnrolled(true);
            setLoading(false);
        }
        checkMFA();
    }, []);

    const handleEnroll = async () => {
        const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
        if (error) return toast.error(error.message);
        setQrCode(data.totp.qr_code);
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: qrCode.id });
        if (challengeError) return toast.error(challengeError.message);

        const { error: verifyError } = await supabase.auth.mfa.verify({ factorId: qrCode.id, challengeId: challenge.id, code: verificationCode });
        if (verifyError) return toast.error(verifyError.message);

        toast.success('2FA habilitado com sucesso!');
        setIsEnrolled(true);
        setQrCode(null);
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Segurança da Conta (2FA)</h1>
            {isEnrolled ? (
                <p>✅ Autenticação de dois fatores já está habilitada para sua conta.</p>
            ) : (
                <div>
                    {!qrCode ? (
                        <button onClick={handleEnroll} className="add-project-button">Habilitar 2FA</button>
                    ) : (
                        <div>
                            <p>1. Escaneie o QR Code com seu app de autenticação (Google Authenticator, Authy, etc).</p>
                            <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                            <form onSubmit={handleVerify}>
                                <p style={{marginTop: '1rem'}}>2. Digite o código gerado pelo app para verificar:</p>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="Código de 6 dígitos"
                                    required
                                />
                                <button type="submit" className="add-project-button" style={{marginTop: '1rem'}}>Verificar e Ativar</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecurityPage;