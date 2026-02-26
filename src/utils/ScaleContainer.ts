// 缩放容器函数
export interface ScaleContainerOptions {
    outerElement: HTMLElement; // 外层容器
    innerElement: HTMLElement; // 内层容器 缩放需要
    width: number; //设计稿宽度
    height: number; //设计稿高度
    x?: number; //X轴微调
    y?: number; //Y轴微调
    windowWidth?: number; //窗口宽度
    resizeOnWindowChange?: boolean; // 窗口大小改变时是否自动刷新
    maxWidth?: number; // 最大宽度限制
  }
  
  export function initScaleContainer(options: ScaleContainerOptions) {
    const {
      outerElement, // 外层容器
      innerElement, // 内层容器 缩放需要
      width, //设计稿宽度
      height,//设计稿高度
      x = 0, //X轴微调
      y = 0 , //Y轴微调
      windowWidth = window.innerWidth, //窗口宽度
      resizeOnWindowChange = false, // 窗口大小改变时是否自动刷新
      maxWidth, // 最大宽度限制
    } = options;
  
    if (!outerElement || !innerElement) {
      console.warn("外层元素或内层元素不存在");
      return;
    }
  
    // 执行缩放逻辑的函数
    const applyScale = (currentWindowWidth: number = window.innerWidth) => {
      let effectiveWidth = currentWindowWidth;
      // 如果设置了最大宽度，窗口宽度大于最大宽度时，使用最大宽度
      if (maxWidth && currentWindowWidth > maxWidth) {
        effectiveWidth = maxWidth;
      }
      
      let scale = effectiveWidth / width;
      
      // 计算缩放后的尺寸
      let scaledWidth = width * scale + x;
      let scaledHeight = height * scale + y;
      
      // 设置最外层容器的宽高为缩放后的尺寸
      outerElement.style.width = scaledWidth + "px";
      outerElement.style.height = scaledHeight + "px";
      
      // 内部内容需要反向缩放以保持原始显示大小
      // 但考虑到已有 translate 微调，这里保持 scale 和 translate 的逻辑
      // 实际上需要将 scale 应用到内部容器而不是外层
      innerElement.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
      innerElement.style.transformOrigin = "top left";
      innerElement.style.width = width + "px";
      innerElement.style.height = height + "px";
    };
  
    // 初始应用缩放
    applyScale(windowWidth);
  
    // 如果启用了窗口大小改变监听，则添加事件监听器
    if (resizeOnWindowChange) {
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      
      const handleResize = () => {
        applyScale();
      };
  
      window.addEventListener('resize', handleResize);
  
      // 返回清理函数，方便在组件卸载时移除监听器
      return () => {
        window.removeEventListener('resize', handleResize);
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
      };
    }
  }
  