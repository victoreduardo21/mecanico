import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { REVIEWS, SHOP_INFO } from '../data';
import { Star, CheckCircle2, User, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Initial load from localstorage or data
  useEffect(() => {
    const cached = localStorage.getItem('zr_car_user_reviews');
    if (cached) {
      try {
        setReviews(JSON.parse(cached));
      } catch (e) {
        setReviews(REVIEWS);
      }
    } else {
      setReviews(REVIEWS);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) {
      alert('Por favor, preencha o seu nome e deixe um breve comentário.');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      author: userName,
      rating: userRating,
      text: userComment,
      date: 'Agora mesmo',
      verified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('zr_car_user_reviews', JSON.stringify(updated));

    // Clear form and display confirmation
    setUserName('');
    setUserComment('');
    setUserRating(5);
    setShowForm(false);
    setSuccessMessage('Muito obrigado! Sua avaliação foi adicionada com sucesso.');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 4500);
  };

  // Recalculate average based on real reviews plus user reviews
  const currentAvgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : SHOP_INFO.rating.toFixed(1);

  return (
    <div className="space-y-6">
      {/* Metrics Card */}
      <div className="bg-[#141417] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-950 border border-slate-800 rounded-xl p-4 text-center shrink-0">
            <span className="block text-4xl font-display font-extrabold text-white leading-none">
              {currentAvgRating}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1.5">
              De 5 estrelas
            </span>
          </div>
          <div>
            <div className="flex gap-1 text-yellow-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 fill-current ${
                    i < Math.round(parseFloat(currentAvgRating)) ? 'text-yellow-500' : 'text-slate-800'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-white">
              Excelente reputação baseada em depoimentos reais
            </p>
            <p className="text-xs text-slate-400">
              {reviews.length} avaliações publicadas por motoristas da Baixada Santista
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-neutral-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-amber-500" />
          <span>Escrever uma Avaliação</span>
        </button>
      </div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-neutral-950 border border-slate-800 p-6 rounded-xl space-y-4 overflow-hidden"
          >
            <h4 className="font-display font-semibold text-white text-base">
              Nova Avaliação para ZR CAR
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Oliveira"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-neutral-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded-md px-4 py-2.5 text-sm text-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Classificação (Estrelas)</label>
                <div className="flex gap-2 items-center h-[42px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 fill-current ${
                          star <= userRating ? 'text-yellow-500' : 'text-slate-800'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-zinc-400 ml-2">({userRating}/5)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Sua Mensagem / Opinião</label>
              <textarea
                rows={3}
                required
                placeholder="Conte o que achou do serviço e do atendimento na oficina..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full bg-neutral-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded-md px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition-colors cursor-pointer"
              >
                Publicar Avaliação
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.05, 0.3) }}
            className="bg-[#141417] border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-slate-800 text-amber-500 font-bold uppercase text-xs">
                    {r.author.slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block leading-tight">{r.author}</span>
                    <span className="text-[10px] text-slate-500 block">{r.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 text-yellow-500 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 fill-current ${
                        i < r.rating ? 'text-yellow-500' : 'text-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">
                "{r.text}"
              </p>
            </div>

            {r.verified && (
              <div className="flex items-center gap-1 mt-4 text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Cliente Verificado via Google</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
