// 高等数学「2026 黄金知识汇编」单选题库（15 题），供 VitePress 刷题组件使用
export const questions: { q: string; options: string[]; answer: number; explain: string }[] = [
  {
    q: '下列各组函数中，不是同一函数的是',
    options: [
      'f(x)=x，g(x)=∛(x³)',
      'f(x)=|x|，g(x)=√(x²)',
      'f(x)=sin²x+cos²x，g(x)=1',
      'f(x)=ln x，g(x)=ln x³',
    ],
    answer: 3,
    explain: '函数二要素为定义域与对应法则；ln x³=3ln x，与 ln x 对应法则不同，故非同一函数。',
  },
  {
    q: '当 x→0 时，下列为 x 的高阶无穷小的是',
    options: ['cos x-1', 'eˣ-1', 'x+x²', 'sin x'],
    answer: 0,
    explain: 'x→0 时 cos x-1 ~ -x²/2，是 x 的高阶无穷小；其余三项均与 x 同阶或等价。',
  },
  {
    q: '若函数 f(x) 在 x₀ 处左、右极限均存在但不相等，则 x₀ 是 f(x) 的',
    options: ['可去间断点', '跳跃间断点', '无穷间断点', '连续点'],
    answer: 1,
    explain: '第一类间断点中左右极限都存在但不相等者为跳跃间断点。',
  },
  {
    q: '曲线 y=2x+ln x 在点 (1,2) 处的切线方程为',
    options: ['y=2x', 'y=3x+1', 'y=3x-1', 'y=x+1'],
    answer: 2,
    explain: 'y′=2+1/x，在 x=1 处斜率 k=3，切线 y-2=3(x-1)，即 y=3x-1。',
  },
  {
    q: '已知 f(x)={x², x≤1; ax+b, x>1} 在 x=1 处可导，则',
    options: ['a=1, b=0', 'a=2, b=0', 'a=1, b=1', 'a=2, b=-1'],
    answer: 3,
    explain: '由连续得 a+b=1，由左、右导数相等得 a=2，故 b=-1。',
  },
  {
    q: 'f(x)=x³-3x² 在 [0,3] 上满足罗尔定理条件，则 ξ=',
    options: ['2', '1', '0', '3'],
    answer: 0,
    explain: 'f(0)=f(3)=0，f′(x)=3x²-6x=3x(x-2)=0，开区间内 ξ=2。',
  },
  {
    q: '下列不定积分结果正确的是',
    options: [
      '∫ (1/x) dx = ln x + C',
      '∫ (1/x) dx = ln|x| + C',
      '∫ (1/x) dx = -1/x² + C',
      '∫ (1/x) dx = (ln x)²/2 + C',
    ],
    answer: 1,
    explain: '∫(1/x)dx 的结果须带绝对值，即 ln|x|+C。',
  },
  {
    q: 'lim(x→0) [∫(0→x) cos t dt] / x =',
    options: ['0', '∞', '1', '-1'],
    answer: 2,
    explain: '∫(0→x) cos t dt = sin x，故原式 = lim sin x / x = 1。',
  },
  {
    q: '广义积分 ∫(0→+∞) x·e^(-x²) dx =',
    options: ['0', '1', '∞', '1/2'],
    answer: 3,
    explain: '令 u=x²，∫x·e^(-x²)dx = -1/2·e^(-x²)，在 0 到 +∞ 上为 1/2。',
  },
  {
    q: '微分方程 xy′+y=xcos x 的通解为',
    options: [
      'y=sin x+(cos x+C)/x',
      'y=cos x+(sin x+C)/x',
      'y=sin x+Cx',
      'y=cos x+Cx',
    ],
    answer: 0,
    explain: '(xy)′=xy′+y=xcos x，积分得 xy=xsin x+cos x+C，故 y=sin x+(cos x+C)/x。',
  },
  {
    q: '微分方程 y″+2y′+5y=0 的通解为',
    options: [
      'y=e^x(C₁cos 2x+C₂sin 2x)',
      'y=e^(-x)(C₁cos 2x+C₂sin 2x)',
      'y=C₁e^(-x)+C₂e^(-2x)',
      'y=e^(-x)(C₁+C₂x)',
    ],
    answer: 1,
    explain: '特征方程 r²+2r+5=0 的根 r=-1±2i，故通解为 e^(-x)(C₁cos 2x+C₂sin 2x)。',
  },
  {
    q: '设向量 a=(1,2,3)，b=(2,-1,0)，则',
    options: ['a∥b', 'a×b=0', 'a⊥b', 'a·b=6'],
    answer: 2,
    explain: 'a·b=1·2+2·(-1)+3·0=0，故 a⊥b。',
  },
  {
    q: '二元函数在驻点处记 A=f_xx，B=f_xy，C=f_yy，若 AC-B²>0 且 A>0，则该驻点为',
    options: ['极大值点', '非极值点', '拐点', '极小值点'],
    answer: 3,
    explain: '判别式 Δ=AC-B²>0 为极值点，A>0 时为极小值点。',
  },
  {
    q: '在极坐标下，二重积分的面积元素 dσ =',
    options: ['r dr dθ', 'dr dθ', 'r² dr dθ', '(1/r) dr dθ'],
    answer: 0,
    explain: '极坐标变换 x=rcosθ, y=rsinθ 下面积元素 dσ=r dr dθ，不可漏 r。',
  },
  {
    q: '下列级数中收敛的是',
    options: ['∑ 1/n', '∑ 1/n²', '∑ 1/√n', '∑ 1'],
    answer: 1,
    explain: 'p-级数 ∑1/n^p 当 p>1 收敛；1/n² 对应 p=2>1，故收敛。',
  },
]
