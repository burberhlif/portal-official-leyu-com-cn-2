/**
 * public/site-helper.js
 * Provides UI utilities: hint cards, keyword badges, and access notes.
 * No external dependencies.
 */
(function() {
  "use strict";

  // --- Configuration ---
  const CONFIG = {
    portalUrl: "https://portal-official-leyu.com.cn",
    keyword: "乐鱼体育",
    cardColors: ["#f0f4ff", "#fff7e6", "#e6fffb", "#fff0f6"],
    badgeColors: ["#1890ff", "#52c41a", "#faad14", "#eb2f96"]
  };

  // --- Data Samples ---
  const hintData = [
    { title: "新手指南", description: "查看平台功能介绍与快速入门。" },
    { title: "活动中心", description: "不定期推出优惠与赛事信息。" },
    { title: "安全提示", description: "请通过官方渠道访问，谨防仿冒。" }
  ];

  const keywordTags = [
    { label: "体育赛事", color: "#1890ff" },
    { label: "电竞竞猜", color: "#52c41a" },
    { label: "真人娱乐", color: "#faad14" },
    { label: "棋牌游戏", color: "#eb2f96" }
  ];

  const accessNotes = [
    { icon: "🔒", text: "请确保使用官方域名访问，注意核对网址。" },
    { icon: "📱", text: "支持移动端与PC端，建议使用最新浏览器。" },
    { icon: "⏰", text: "客服在线时间：每日 08:00 - 02:00（北京时间）。" }
  ];

  // --- Utility Functions ---
  function createElement(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML !== undefined) el.innerHTML = innerHTML;
    return el;
  }

  function setAttributes(el, attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  }

  // --- Card Builder ---
  function buildHintCard(data, index) {
    const card = createElement("div", "hint-card");
    card.style.backgroundColor = CONFIG.cardColors[index % CONFIG.cardColors.length];
    const title = createElement("h4", "hint-card-title", data.title);
    const desc = createElement("p", "hint-card-desc", data.description);
    card.appendChild(title);
    card.appendChild(desc);
    return card;
  }

  function buildBadge(tag) {
    const badge = createElement("span", "keyword-badge", tag.label);
    badge.style.backgroundColor = tag.color;
    badge.style.color = "#fff";
    return badge;
  }

  function buildAccessNote(note) {
    const item = createElement("li", "access-note-item", note.icon + " " + note.text);
    return item;
  }

  // --- Container Builder ---
  function buildSection(title, containerClass, items) {
    const section = createElement("div", containerClass);
    const heading = createElement("h3", "section-heading", title);
    section.appendChild(heading);
    const wrapper = createElement("div", "section-content");
    items.forEach(function(item) {
      wrapper.appendChild(item);
    });
    section.appendChild(wrapper);
    return section;
  }

  // --- Main Render ---
  function renderSiteHelper(rootSelector) {
    const root = document.querySelector(rootSelector);
    if (!root) {
      console.warn("site-helper: root element not found (" + rootSelector + ")");
      return;
    }

    // Access URL reference
    const urlInfo = createElement("p", "portal-url-ref", "官方入口：" + CONFIG.portalUrl);
    root.appendChild(urlInfo);

    // Build cards
    const cards = hintData.map(function(data, idx) {
      return buildHintCard(data, idx);
    });
    root.appendChild(buildSection("提示卡片", "hint-cards-section", cards));

    // Build badges
    const badges = keywordTags.map(function(tag) {
      return buildBadge(tag);
    });
    root.appendChild(buildSection("关键词徽章", "keyword-badges-section", badges));

    // Build access notes list
    const notes = accessNotes.map(function(note) {
      return buildAccessNote(note);
    });
    root.appendChild(buildSection("访问说明", "access-notes-section", notes));

    // Additional keyword mention
    const kwMention = createElement("div", "keyword-mention");
    kwMention.innerHTML = "核心关键词：<strong>" + CONFIG.keyword + "</strong> —— 汇聚精彩赛事与娱乐体验。";
    root.appendChild(kwMention);
  }

  // --- Initialize on DOM ready ---
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      renderSiteHelper("#site-helper-root");
    });
  } else {
    renderSiteHelper("#site-helper-root");
  }

})();