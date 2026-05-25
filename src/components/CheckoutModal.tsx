import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Copy, Check, Sparkles, CreditCard, Landmark, ArrowRight, Smartphone, RefreshCw } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onPaymentSuccess }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pixTimeLeft, setPixTimeLeft] = useState(600); // 10 minutes count down

  // Mock Card Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPixTimeLeft(prev => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatPixTime = () => {
    const mins = Math.floor(pixTimeLeft / 60);
    const secs = pixTimeLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pixKey = "00020126580014br.gov.bcb.pix01366110f032-421c-4390-ac92-f04bf4e3ce1c52040000530398654045.995802BR5925MOLDES DE FESTA INFANTIL6009SAO PAULO62070503***6304CA27";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleProcessSimulatedPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      />

      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 font-sans text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <div>
              <h3 className="font-bold text-lg text-white font-display">
                Checkout Seguro
              </h3>
              <p className="text-xs text-slate-400">
                Acesso imediato aos +2.500 moldes
              </p>
            </div>
          </div>
          <div 
            onClick={onClose}
            role="button"
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-755 transition-colors cursor-pointer select-none"
          >
            <X className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Order Summary */}
          <div className="bg-slate-950 rounded-2xl p-4 mb-6 border border-slate-850/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
                Você está adquirindo
              </div>
              <h4 className="font-bold text-sm text-white">
                Mega Kit 2.500+ Moldes de Festas
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Formatos: PDF, PNG, SVG, Studio V3
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">
                R$ 97,00
              </span>
              <span className="font-black text-xl text-amber-400 font-display">
                R$ 5,99
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              onClick={() => setPaymentMethod('pix')}
              role="button"
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border transition-all text-sm font-semibold cursor-pointer select-none ${
                paymentMethod === 'pix'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              PIX Copia e Cola
            </div>
            <div
              onClick={() => setPaymentMethod('card')}
              role="button"
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border transition-all text-sm font-semibold cursor-pointer select-none ${
                paymentMethod === 'card'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Cartão de Crédito
            </div>
          </div>

          {/* Tab content */}
          {processing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
              <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin" />
              <div>
                <h5 className="font-bold text-base text-white">
                  Confirmando o Pagamento...
                </h5>
                <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto">
                  Por favor, aguarde alguns instantes enquanto processamos os dados de forma segura.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {paymentMethod === 'pix' ? (
                /* PIX TAB */
                <div className="flex flex-col items-center text-center gap-4">
                  {/* Mock QR Code in SVG */}
                  <div className="bg-white p-3 rounded-2xl relative shadow-md">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 text-slate-900">
                      {/* Outer boundary */}
                      <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                      <rect x="7" y="7" width="16" height="16" fill="white" />
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                      <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                      <rect x="77" y="7" width="16" height="16" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                      <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                      <rect x="7" y="77" width="16" height="16" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                      {/* Random pixel matrices simulating valid QR codes */}
                      <rect x="30" y="10" width="10" height="10" fill="currentColor" />
                      <rect x="45" y="15" width="15" height="5" fill="currentColor" />
                      <rect x="35" y="30" width="20" height="15" fill="currentColor" />
                      <rect x="65" y="30" width="10" height="10" fill="currentColor" />
                      <rect x="10" y="35" width="15" height="15" fill="currentColor" />
                      <rect x="15" y="55" width="10" height="10" fill="currentColor" />
                      
                      <rect x="35" y="55" width="15" height="15" fill="currentColor" />
                      <rect x="55" y="50" width="15" height="10" fill="currentColor" />
                      <rect x="75" y="45" width="10" height="25" fill="currentColor" />

                      <rect x="30" y="75" width="20" height="15" fill="currentColor" />
                      <rect x="60" y="70" width="10" height="10" fill="currentColor" />
                      <rect x="55" y="85" width="25" height="10" fill="currentColor" />
                      
                      {/* Pix Logo circle in middle */}
                      <circle cx="50" cy="50" r="10" fill="white" />
                      <path d="M 46 50 L 50 46 L 54 50 L 50 54 Z" fill="#12b886" />
                    </svg>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      Código expira em: <strong className="text-slate-100 font-mono">{formatPixTime()}</strong>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                      Aprovação imediata
                    </span>
                  </div>

                  {/* Copy Button */}
                  <div
                    onClick={handleCopyPix}
                    role="button"
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-755 transition-colors w-full border border-slate-700 p-3 rounded-xl text-xs font-semibold cursor-pointer select-none"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Código Pix Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        Copiar Código Pix Copiar e Cola
                      </>
                    )}
                  </div>

                  <div className="w-full mt-2 pt-4 border-t border-slate-850">
                    <div
                      onClick={handleProcessSimulatedPayment}
                      role="button"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold p-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 uppercase cursor-pointer select-none"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Simular Confirmação do Pix
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">
                      (Clique acima para aprovar sua simulação com sucesso)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4444 5555 6666 7777"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      maxLength={19}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="NOME COMPLETO"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="12/32"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/[^\d/]/g, ''))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        CVC / Código
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="***"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 text-center"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-850 mt-2">
                    <div
                      onClick={handleProcessSimulatedPayment}
                      role="button"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold p-3.5 rounded-xl text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 uppercase cursor-pointer select-none"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Finalizar Pagamento Seguro
                    </div>
                    <p className="text-[10px] text-slate-450 mt-2 text-center">
                      🔒 Seus dados estão 100% criptografados. Ambiente de simulação.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Secure seals under forms */}
          <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-center gap-4 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              🔒 SSL Seguro
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              🛡️ Garantia de Satisfação
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
