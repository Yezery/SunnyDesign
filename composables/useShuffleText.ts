export function useShuffleText(duration = 1000, intervalTime = 100) {
  let shuffleInterval: NodeJS.Timeout | null = null;
  let isAnimating = false;  // 独立的状态：是否正在打乱或复原

  // 生成随机字符的方法
  const generateRandomText = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomText = '';
    for (let i = 0; i < length; i++) {
      randomText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomText;
  };

  // 文字打乱效果，直接修改目标元素的 innerHTML
  const shuffleText = (targetElement: HTMLElement, originalText: string) => {
    // 如果正在打乱或复原，直接返回，防止重复触发
    if (isAnimating) return;

    isAnimating = true; // 标记为正在动画
    const steps = duration / intervalTime;
    let progress = 0;

    // 清除之前的打乱效果
    if (shuffleInterval) clearInterval(shuffleInterval);

    // 打乱文字的 interval
    shuffleInterval = setInterval(() => {
      targetElement.innerHTML = generateRandomText(originalText.length); // 打乱的文字直接赋给目标元素
    }, intervalTime);

    // 逐渐恢复原文字的 interval
    const recoverInterval = setInterval(() => {
      if (progress < steps) {
        const partialText = originalText.slice(0, Math.floor((progress / steps) * originalText.length));
        targetElement.innerHTML = partialText + generateRandomText(originalText.length - partialText.length);
        progress++;
      } else {
        clearInterval(recoverInterval);
        if (shuffleInterval) clearInterval(shuffleInterval);
        targetElement.innerHTML = originalText; // 完全恢复原文字
        isAnimating = false;  // 动画完成，允许重新触发
      }
    }, intervalTime);
  };

  // 在组件销毁时清除 interval
  onBeforeUnmount(() => {
    if (shuffleInterval) clearInterval(shuffleInterval);
  });

  return { shuffleText };
}
