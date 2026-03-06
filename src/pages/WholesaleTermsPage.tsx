import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const WholesaleTermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Условия предоставления оптовых скидок
          </h1>
          <p className="text-sm text-muted-foreground">
            Действуют с 1 марта 2026 года. Редакция от 06.03.2026
          </p>
        </div>
      </section>

      <div className="container-main py-10 md:py-14 max-w-3xl">
        {/* 1. General Provisions */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-bold mb-4">1. Общие положения</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              1.1. Настоящие условия определяют порядок предоставления скидок при оформлении
              заказов в интернет-магазине TULSY (далее — «Продавец»).
            </p>
            <p>
              1.2. Скидки предоставляются автоматически при достижении установленного порога
              стоимости заказа и распространяются на все товары в заказе, независимо от их
              категории.
            </p>
            <p>
              1.3. Продавец оставляет за собой право изменять условия предоставления скидок,
              уведомив об этом путём обновления настоящей страницы.
            </p>
          </div>
        </section>

        {/* 2. Discount Tiers */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-bold mb-4">2. Шкала скидок</h2>
          <p className="text-muted-foreground mb-6">
            Размер скидки определяется общей суммой заказа в соответствии со следующей
            таблицей:
          </p>

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Сумма заказа</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Размер скидки</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>До 200 000 ₽</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">Без скидки</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>От 200 000 до 400 000 ₽</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 hover:bg-amber-100">5%</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>От 400 000 до 700 000 ₽</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 hover:bg-emerald-100">10%</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* 3. Calculation Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-bold mb-4">3. Порядок расчёта</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              3.1. Скидка применяется ко всем позициям заказа, независимо от товарной категории
              (диваны, кресла, стулья, столы и пр.).
            </p>
            <p>
              3.2. В расчёте общей суммы заказа для определения порога скидки участвуют
              <strong className="text-foreground"> только товары по регулярной (неакционной) цене</strong>.
              Товары, на которые уже действует акция или специальное предложение, не
              учитываются при определении порогового значения.
            </p>
            <p>
              3.3. Скидка рассчитывается от стоимости каждой позиции до вычета иных скидок
              и промокодов.
            </p>
          </div>
        </section>

        {/* 4. Exclusions */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-bold mb-4">4. Исключения</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              4.1. Оптовая скидка не суммируется с акционными предложениями, промокодами
              и иными специальными условиями, если иное не указано в условиях конкретной акции.
            </p>
            <p>
              4.2. Стоимость доставки не входит в расчёт суммы заказа для определения порога
              скидки.
            </p>
          </div>
        </section>

        {/* 5. Final provisions */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-bold mb-4">5. Заключительные положения</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              5.1. Окончательная сумма заказа с учётом скидки подтверждается менеджером
              Продавца после оформления заявки.
            </p>
            <p>
              5.2. По вопросам, связанным с расчётом скидок, вы можете обратиться к нашим
              менеджерам по телефону{' '}
              <a href="tel:+79269890852" className="text-primary hover:underline">
                +7 (926) 989-08-52
              </a>{' '}
              или по электронной почте{' '}
              <a href="mailto:info@tecona.ru" className="text-primary hover:underline">
                info@tecona.ru
              </a>.
            </p>
          </div>
        </section>

        <div className="border-t pt-6 text-xs text-muted-foreground text-center">
          <p>
            Настоящий документ носит исключительно информационный характер и не является
            публичной офертой в соответствии со ст. 437 ГК РФ.
          </p>
          <p className="mt-2">
            <Link to="/catalog" className="text-primary hover:underline">
              Перейти в каталог
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WholesaleTermsPage;
