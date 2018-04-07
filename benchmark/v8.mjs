export const GetOptimizationStatus = (fn) => {
  let bits = %GetOptimizationStatus(fn);
  const flag = (n) => (bits & 1 << n) !== 0;

  return {
    function: flag(0),
    never_optimized: flag(1),
    always_optimized: flag(2),
    maybe_deoptimized: flag(3),
    optimized: flag(4),
    optimized_by_turbofan: flag(5),
    interpreted: flag(6),
    marked_for_optimization: flag(7),
    marked_for_concurrent_optimization: flag(8),
    optimizing_concurrently: flag(9),
    executing: flag(10)
  };
}