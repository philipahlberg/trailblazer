const GetOptimizationStatus = new Function('fn',
  '%GetOptimizationStatus(fn)'
);

const UnmaskAll = (fn) => {
  const bits = GetOptimizationStatus(fn);
  const Unmask = (n) => ((bits >> n) & 1) === 1;

  return {
    IsFunction: Unmask(0),
    NeverOptimized: Unmask(1),
    AlwaysOptimized: Unmask(2),
    MaybeDeoptimized: Unmask(3),
    Optimized: Unmask(4),
    OptimizedByTurbofan: Unmask(5),
    Interpreted: Unmask(6),
    MarkedForOptimization: Unmask(7),
    MarkedForConcurrentOptimization: Unmask(8),
    OptimizingConcurrently: Unmask(9),
    IsExecuting: Unmask(10),
    TopmostFrameIsTurboFanned: Unmask(11),
    LiteMode: Unmask(12)
  };
}

export default UnmaskAll;