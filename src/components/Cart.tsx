import React from 'react';
import { useCart } from '../store/useCart';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { isOpen, items, actions } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.toggleCart}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-bordersubtle z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-bordersubtle flex items-center justify-between">
              <h2 className="text-2xl font-heading">Your Cart</h2>
              <button onClick={actions.toggleCart} className="text-textlight hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-textlight space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-paragraph">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-sm text-textlight">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => actions.removeItem(item.id)}
                          className="text-xs text-destructive hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-bordersubtle bg-secondary/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-textlight uppercase tracking-widest text-sm">Total</span>
                  <span className="text-2xl font-heading">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full py-6 uppercase tracking-widest">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
