import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal, totalItems } = useCart();

  if (!isOpen) return null;

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = (freeShippingThreshold - subtotal).toLocaleString('en-IN');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFCFE',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', margin: 0 }}>
              Shopping Cart ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              marginBottom: '0.45rem',
              color: 'var(--color-navy)',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Truck size={15} color="var(--color-primary)" />
              {subtotal >= freeShippingThreshold ? (
                <span style={{ color: 'var(--color-green)' }}>🎉 You unlocked Free Express Shipping!</span>
              ) : (
                <span>Add ₹{amountNeeded} more for Free Shipping</span>
              )}
            </span>
            <span>{progressToFreeShipping}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#E2E8F0',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressToFreeShipping}%`,
                height: '100%',
                backgroundColor: subtotal >= freeShippingThreshold ? 'var(--color-green)' : 'var(--color-primary)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '2rem 1rem',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--color-primary)',
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '260px' }}>
                Discover our ready-to-ship precision engineered 3D models or request a custom print.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeCart();
                  const target = document.getElementById('featured-products');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Ready Models
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <img
                    src={item.product.thumbnail || item.product.images[0]}
                    alt={item.product.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <h4
                          style={{
                            fontSize: '0.925rem',
                            color: 'var(--color-navy)',
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ color: '#94A3B8', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                        {item.selectedSize && <span style={{ fontWeight: 600 }}>{item.selectedSize} • </span>}
                        <span>{item.selectedMaterial}</span> • <span>{item.selectedColor}</span>
                        {item.customText && (
                          <div style={{ color: 'var(--color-primary-blue)', marginTop: '2px', fontWeight: 500 }}>
                            Custom: &ldquo;{item.customText}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#F8FAFC',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ padding: '0.25rem 0.5rem', color: 'var(--color-text)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '22px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ padding: '0.25rem 0.5rem', color: 'var(--color-text)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: '#FAFCFE',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 600, color: subtotal >= freeShippingThreshold ? 'var(--color-green)' : 'var(--color-navy)' }}>
                {subtotal >= freeShippingThreshold ? 'FREE' : '₹99'}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                borderTop: '1px dashed var(--color-border)',
                paddingTop: '0.65rem',
              }}
            >
              <span>Total</span>
              <span>
                ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 99)).toLocaleString('en-IN')}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight size={18} />}
              onClick={() => {
                alert('Checkout process initiated! In full production, this forwards to secure payment.');
              }}
            >
              Proceed to Secure Checkout
            </Button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.2rem',
              }}
            >
              <ShieldCheck size={14} color="var(--color-green)" />
              <span>256-bit Encrypted Checkout • 100% Fit & Tolerance Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

