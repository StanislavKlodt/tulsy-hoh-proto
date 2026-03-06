

## Plan: Create Wholesale Discount Terms Page

### What we'll build
A formal, legally-styled page at `/wholesale-terms` describing the tiered discount structure. The page will follow the same visual style as `DeliveryPage` (header section, structured content, clean typography).

### Content structure
1. **Header** — "Условия предоставления оптовых скидок"
2. **Effective date** — "Действуют с [дата]"
3. **General provisions** — introductory legal language
4. **Discount tiers table** — three tiers in a styled table:
   - До 200 000 ₽ — без скидки
   - 200 000 – 400 000 ₽ — 5%
   - 400 000 – 700 000 ₽ — 10%
5. **Key rules** — numbered list:
   - Скидка от общей суммы заказа, независимо от категорий
   - В расчёте участвуют только неакционные товары
   - Акционные товары не суммируются в оптовый порог
6. **Additional notes / disclaimers** — standard legal footer text

### Technical changes

1. **New file: `src/pages/WholesaleTermsPage.tsx`** — page component with formal content
2. **Edit: `src/App.tsx`** — add route `/wholesale-terms` and import
3. **Update memory** — adjust pricing thresholds from 150k to 200k to match new rules

### Notes
- The `WholesaleProgress` component in cart currently uses 150k threshold — this may need updating separately to match the new official terms (will flag but not change unless requested).

