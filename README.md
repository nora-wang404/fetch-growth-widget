# Fetch Pet Insurance Estimator Widget

A lightweight growth widget prototype that estimates monthly pet insurance costs.

The widget appears as a floating button in the bottom-right corner of a page. When opened, it expands into a small calculator panel where users can quickly estimate their pet insurance premium and proceed to a quote.

This project simulates the kind of **conversion surface / growth experiment** often used on product landing pages.

Built with plain **HTML, CSS, and JavaScript** (no frameworks).

---

## Demo

This repository includes a simple demo page that simulates how the widget could appear on a pet insurance landing page.

Open:

demo.html

You will see a floating paw button in the bottom-right corner. Clicking it opens the estimator panel.

---

## Features

- Floating widget launcher (bottom-right corner)
- Pet insurance cost estimator
- Inputs for:
  - Pet type (dog / cat)
  - Breed size
  - Age
  - Gender
- Estimated monthly premium range
- Conversion CTA: **Get personalised quote**
- Close / reopen panel interaction
- Mobile-friendly layout
- Lightweight and framework-free

---

The widget is self-contained and can be embedded into any website.

---

## Embedding the Widget

To embed the widget on a website, add the script before the closing `</body>` tag:

```html
<script src="https://your-domain.com/widget.js"></script>
<script>
FetchWidget.init();
</script>