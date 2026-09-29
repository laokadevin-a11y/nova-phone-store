(() => {
  const historyKey = 'novaChatHistory';
  const widget = document.createElement('div');
  widget.className = 'support-widget';
  widget.innerHTML = `<div class="support-widget-panel" aria-live="polite"><div class="support-widget-head"><div><strong>NOVA Care</strong><small>Thường phản hồi trong vài phút</small></div><button class="support-widget-close" type="button" aria-label="Đóng hỗ trợ">×</button></div><div class="support-widget-body"><div class="support-widget-message">Xin chào! Mình có thể tư vấn sản phẩm, kiểm tra đơn hàng hoặc hỗ trợ bảo hành.</div><div class="support-widget-quick"><button type="button" data-support-question="Tư vấn chọn sản phẩm">Tư vấn chọn máy</button><button type="button" data-support-question="Kiểm tra đơn hàng">Kiểm tra đơn hàng</button><button type="button" data-support-question="Bảo hành hoặc sửa chữa">Bảo hành</button></div></div><form class="support-widget-form"><input autocomplete="off" placeholder="Viết tin nhắn..." aria-label="Tin nhắn hỗ trợ"><button type="submit" aria-label="Gửi tin nhắn">↑</button></form></div><button class="support-widget-toggle" type="button" aria-label="Mở NOVA Care" aria-expanded="false">●</button>`;
  document.body.append(widget);

  const panel = widget.querySelector('.support-widget-panel');
  const body = widget.querySelector('.support-widget-body');
  const input = widget.querySelector('input');
  const saved = JSON.parse(localStorage.getItem(historyKey) || '[]');

  function addMessage(text, type = 'agent', persist = true) {
    const message = document.createElement('div');
    message.className = `support-widget-message${type === 'user' ? ' user' : ''}`;
    message.textContent = text;
    body.append(message);
    body.scrollTop = body.scrollHeight;
    if (persist) {
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      history.push({ text, type });
      localStorage.setItem(historyKey, JSON.stringify(history.slice(-20)));
    }
  }

  function answer(text) {
    const normalized = text.toLowerCase();
    if (normalized.includes('đơn')) return 'Bạn hãy để lại mã đơn hoặc số điện thoại trong phần hỗ trợ, NOVA Care sẽ kiểm tra và phản hồi sớm.';
    if (normalized.includes('bảo hành') || normalized.includes('sửa')) return 'NOVA Care hỗ trợ kiểm tra lỗi phần cứng, phần mềm và hướng dẫn gửi máy để sửa chữa.';
    if (normalized.includes('chọn') || normalized.includes('sản phẩm') || normalized.includes('máy')) return 'Bạn có thể dùng nút So sánh sản phẩm trên trang danh sách để đối chiếu thông số của hai mẫu máy.';
    return 'Mình đã ghi nhận câu hỏi. Bạn hãy để lại số điện thoại trong phần hỗ trợ để NOVA Care liên hệ trực tiếp nhé.';
  }

  function send(text) {
    const value = text.trim();
    if (!value) return;
    addMessage(value, 'user');
    input.value = '';
    window.setTimeout(() => addMessage(answer(value)), 250);
  }

  saved.forEach(({ text, type }) => addMessage(text, type, false));
  widget.querySelector('.support-widget-toggle').addEventListener('click', () => {
    const isOpen = panel.classList.toggle('show');
    widget.querySelector('.support-widget-toggle').setAttribute('aria-expanded', String(isOpen));
    if (isOpen) { input.focus(); window.dispatchEvent(new CustomEvent('novaSupportOpened')); }
  });
  widget.querySelector('.support-widget-close').addEventListener('click', () => panel.classList.remove('show'));
  widget.querySelectorAll('[data-support-question]').forEach(button => button.addEventListener('click', () => send(button.dataset.supportQuestion)));
  widget.querySelector('form').addEventListener('submit', event => { event.preventDefault(); send(input.value); });
})();
