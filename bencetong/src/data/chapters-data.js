/**
 * 广东专升本高等数学 — 各章节知识点数据
 * 通俗讲解 + 公式 + 例题，适合零基础
 */

export const CHAPTERS = [
  {
    id: 1,
    num: '第1章',
    name: '函数与极限',
    weight: '15%',
    color: '#6366f1',
    sections: [
      {
        title: '1.1 函数的概念',
        content: `**函数**就是"输入一个数，输出一个数"的规则。
        
比如：**f(x) = x²** 表示"把输入的数平方再输出"。
- 输入 x=3 → 输出 f(3)=9
- 输入 x=-2 → 输出 f(-2)=4

**定义域**：输入可以取哪些数。
**值域**：输出可以得到哪些数。

> 💡 **通俗比喻**：函数就像一台果汁机——你放苹果进去（输入），它出苹果汁（输出）。放什么水果由定义域决定，能出什么果汁由值域决定。`,
        formula: 'y = f(x)，x ∈ D（定义域），y ∈ R（值域）',
        example: '**例题**：求 f(x) = 1/(x-1) 的定义域\n**解**：分母不能为0，所以 x-1 ≠ 0，即 x ≠ 1\n定义域为 (-∞,1) ∪ (1,+∞)'
      },
      {
        title: '1.2 函数的奇偶性',
        content: `**偶函数**：f(-x) = f(x)，图像关于 y 轴对称。
如：f(x) = x²，f(-2)=4，f(2)=4

**奇函数**：f(-x) = -f(x)，图像关于原点对称。
如：f(x) = x³，f(-2)=-8，-f(2)=-8

> 💡 **通俗记忆**：偶函数像照镜子（左右对称），奇函数像转180度（上下颠倒）。`,
        formula: '偶函数：f(-x) = f(x)  |  奇函数：f(-x) = -f(x)',
        example: '**例题**：判断 f(x) = x³ + x 的奇偶性\n**解**：f(-x) = (-x)³ + (-x) = -x³ - x = -(x³ + x) = -f(x)\n所以 f(x) 是奇函数'
      },
      {
        title: '1.3 极限的概念',
        content: `**极限**就是"当 x 无限靠近某个数时，f(x) 无限靠近什么数"。

> 💡 **通俗比喻**：你朝一堵墙走，每次走剩下距离的一半。你永远走不到墙边，但可以无限接近——这个"墙的位置"就是极限。

**左极限**：从左边靠近（x→a⁻）
**右极限**：从右边靠近（x→a⁺）
**极限存在**：左极限 = 右极限`,
        formula: '\\lim_{x \\to a} f(x) = L',
        example: '**例题**：求 lim(x→0) x²\n**解**：x 越靠近0，x² 越靠近0\n所以 lim(x→0) x² = 0'
      },
      {
        title: '1.4 重要极限公式',
        content: `**两个超级重要的极限**（必须背！）：

**第一个**：lim(x→0) sin(x)/x = 1
**第二个**：lim(x→∞) (1 + 1/x)ˣ = e

> 💡 **记忆口诀**："sin里面比外面，极限等于1；1加倒数x次方，极限是e"`,
        formula: '① \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\quad ② \\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x = e',
        example: '**例题**：求 lim(x→0) sin(2x)/x\n**解**：原式 = lim(x→0) 2·sin(2x)/(2x) = 2×1 = 2'
      },
      {
        title: '1.5 连续与间断',
        content: `**连续**：函数图像在 x=a 处没有断点——可以一笔画过去。

连续的三条件（缺一不可）：
1. f(a) 有定义（x=a 在定义域内）
2. lim(x→a) f(x) 存在（左极限=右极限）
3. 极限值 = f(a)

> 💡 **通俗比喻**：连续就像一条没断的路，你可以从左边走到右边。间断就像路上有个坑或断桥。`,
        formula: '\\lim_{x \\to a} f(x) = f(a)',
        example: '**例题**：判断 f(x) = (x²-1)/(x-1) 在 x=1 处是否连续\n**解**：f(1) 无定义（分母为0），所以不连续\n但化简后 f(x)=x+1（x≠1），lim(x→1) f(x)=2'
      }
    ],
    practice: [
      {
        question: '函数 f(x) = √(x-2) 的定义域是？',
        answer: 'x ≥ 2，即 [2, +∞)',
        hint: '根号里面的数必须 ≥ 0'
      },
      {
        question: 'lim(x→0) sin(3x)/x = ?',
        answer: '3',
        hint: 'sin(3x)/x = 3·sin(3x)/(3x) → 3×1 = 3'
      },
      {
        question: 'f(x) = x² 是奇函数还是偶函数？',
        answer: '偶函数，因为 f(-x) = (-x)² = x² = f(x)',
        hint: '看 f(-x) 等于 f(x) 还是 -f(x)'
      }
    ]
  },
  {
    id: 2,
    num: '第2章',
    name: '一元函数微分学',
    weight: '20%',
    color: '#f59e0b',
    sections: [
      {
        title: '2.1 导数的概念',
        content: `**导数**就是"函数在某一点的变化率"——也就是"这一点的斜率"。

> 💡 **通俗比喻**：你开车时车速表显示的就是"位置对时间的导数"——速度越快，导数越大。

**导数公式**：f'(x) = lim(h→0) [f(x+h) - f(x)] / h

**几何意义**：导数 f'(x₀) 就是曲线在 x₀ 处的切线斜率。`,
        formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
        example: '**例题**：求 f(x) = x² 在 x=2 处的导数\n**解**：f\'(2) = lim(h→0) [(2+h)² - 4]/h\n= lim(h→0) (4+4h+h²-4)/h\n= lim(h→0) (4h+h²)/h = lim(h→0) (4+h) = 4'
      },
      {
        title: '2.2 基本求导公式',
        content: `**必须背下来的求导公式**（每天默写一遍）：

① (xⁿ)' = n·xⁿ⁻¹
② (sin x)' = cos x
③ (cos x)' = -sin x
④ (eˣ)' = eˣ
⑤ (ln x)' = 1/x
⑥ 常数 C 的导数 = 0

> 💡 **记忆技巧**：幂函数"指数放前面，指数减1"；sin变cos，cos变负sin；e的导数还是它自己！`,
        formula: "① (xⁿ)' = n·xⁿ⁻¹  ② (sin x)' = cos x  ③ (cos x)' = -sin x \\\n④ (eˣ)' = eˣ  ⑤ (ln x)' = 1/x  ⑥ (C)' = 0",
        example: '**例题**：求 f(x) = x⁵ 的导数\n**解**：f\'(x) = 5·x⁵⁻¹ = 5x⁴'
      },
      {
        title: '2.3 求导法则',
        content: `**加减法则**：(u ± v)' = u' ± v'

**乘法法则**：(uv)' = u'v + uv'
> "前导后不导 + 前不导后导"

**除法法则**：(u/v)' = (u'v - uv')/v²

**链式法则**（复合函数）：
[f(g(x))]' = f'(g(x)) · g'(x)
> "外层导 × 内层导"`,
        formula: '(uv)\' = u\'v + uv\'  \\quad  [f(g(x))]\' = f\'(g(x))·g\'(x)',
        example: '**例题**：求 f(x) = (x²+1)³ 的导数\n**解**：令 u = x²+1，f = u³\nf\'(x) = 3u² · (2x) = 3(x²+1)² · 2x = 6x(x²+1)²'
      },
      {
        title: '2.4 导数的应用',
        content: `**导数 = 0 的点**可能是极值点（最高点或最低点）。

**求极值步骤**：
1. 求 f'(x)
2. 令 f'(x)=0，解出 x（驻点）
3. 判断 f''(x) 的符号
   - f''(x₀) > 0 → 极小值
   - f''(x₀) < 0 → 极大值

> 💡 **通俗比喻**：爬山时，导数=0的地方就是山顶或山脚。二阶导数告诉你这是山顶（负）还是山脚（正）。`,
        formula: 'f\'(x₀)=0 且 f\'\'(x₀)>0 → 极小值  |  f\'(x₀)=0 且 f\'\'(x₀)<0 → 极大值',
        example: '**例题**：求 f(x) = x² - 4x + 3 的极值\n**解**：f\'(x) = 2x - 4，令 f\'(x)=0 → x=2\nf\'\'(x) = 2 > 0，所以 x=2 处取极小值\nf(2) = 4 - 8 + 3 = -1'
      }
    ],
    practice: [
      {
        question: '求 f(x) = 3x² 的导数',
        answer: "f'(x) = 6x",
        hint: "(x²)' = 2x，再乘以系数3"
      },
      {
        question: '求 f(x) = (x+1)(x-1) 的导数',
        answer: "f'(x) = 2x",
        hint: '先用乘法法则，或者展开为 x²-1 再求导'
      },
      {
        question: 'f(x) = x³ 在 x=2 处的切线斜率是？',
        answer: '12',
        hint: "f'(x) = 3x²，f'(2) = 3×4 = 12"
      }
    ]
  },
  {
    id: 3,
    num: '第3章',
    name: '一元函数积分学',
    weight: '20%',
    color: '#22c55e',
    sections: [
      {
        title: '3.1 不定积分的概念',
        content: `**积分是导数的逆运算**——知道导数求原函数。

> 💡 **通俗比喻**：导数像"加速"，积分像"减速"。你知道速度（导数），想知道位置（原函数）。

**不定积分**：∫ f(x) dx = F(x) + C
- F'(x) = f(x)
- C 是任意常数（不能漏！）

**基本积分公式**（和求导公式一一对应）：
① ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C（n≠-1）
② ∫ cos x dx = sin x + C
③ ∫ sin x dx = -cos x + C
④ ∫ eˣ dx = eˣ + C
⑤ ∫ 1/x dx = ln|x| + C`,
        formula: '∫ f(x) dx = F(x) + C，其中 F\'(x) = f(x)',
        example: '**例题**：求 ∫ 2x dx\n**解**：∫ 2x dx = x² + C\n（验证：对 x² 求导得 2x ✅）'
      },
      {
        title: '3.2 定积分的概念',
        content: `**定积分**就是求曲线下方的面积。

> 💡 **通俗比喻**：把一块不规则的地切成很多细条，每条近似长方形，加起来就是总面积。切得越细，结果越精确。

**定积分**：∫ₐᵇ f(x) dx
- a 是下限，b 是上限
- 结果是一个数（不是函数）

**牛顿-莱布尼茨公式**：
∫ₐᵇ f(x) dx = F(b) - F(a)
（F 是 f 的一个原函数）`,
        formula: '∫_a^b f(x) dx = F(b) - F(a) \\quad（微积分基本定理）',
        example: '**例题**：求 ∫₀¹ 2x dx\n**解**：∫ 2x dx = x² + C\n∫₀¹ 2x dx = 1² - 0² = 1'
      },
      {
        title: '3.3 定积分的应用',
        content: `**求面积**：曲线 y=f(x) 与 x 轴在 [a,b] 间的面积
S = ∫ₐᵇ |f(x)| dx

> 💡 **通俗记忆**：定积分就是"切条求和"——把图形切成无数细条，每条宽 dx、高 f(x)，加起来就是总面积。`,
        formula: 'S = ∫_a^b |f(x)| dx',
        example: '**例题**：求 y=x 在 [0,2] 上与 x 轴围成的面积\n**解**：S = ∫₀² x dx = [x²/2]₀² = 2 - 0 = 2'
      }
    ],
    practice: [
      {
        question: '求 ∫ 3x² dx',
        answer: 'x³ + C',
        hint: '∫ x² dx = x³/3，再乘以3'
      },
      {
        question: '求 ∫₀² x dx',
        answer: '2',
        hint: '∫ x dx = x²/2，代入上下限'
      },
      {
        question: '∫ cos x dx = ?',
        answer: 'sin x + C',
        hint: 'sin x 的导数是 cos x'
      }
    ]
  },
  {
    id: 4,
    num: '第4章',
    name: '向量与空间几何',
    weight: '8%',
    color: '#8b5cf6',
    sections: [
      {
        title: '4.1 向量的概念',
        content: `**向量**就是"有方向和大小的量"。

> 💡 **通俗比喻**：向量像一张地图上的箭头——告诉你往哪个方向走多远。普通数字（标量）只告诉你"多远"，不告诉方向。

**表示**：a = (x, y, z)
**模长**：|a| = √(x² + y² + z²)

**零向量**：模长为0的向量 (0,0,0)
**单位向量**：模长为1的向量`,
        formula: 'a = (x, y, z)，|a| = \\sqrt{x² + y² + z²}',
        example: '**例题**：已知 a = (3, 4, 0)，求 |a|\n**解**：|a| = √(3² + 4² + 0²) = √25 = 5'
      },
      {
        title: '4.2 向量的运算',
        content: `**加法**：(x₁,y₁,z₁) + (x₂,y₂,z₂) = (x₁+x₂, y₁+y₂, z₁+z₂)
> 平行四边形法则

**数乘**：k·(x,y,z) = (kx, ky, kz)

**点积**（数量积）：
a·b = x₁x₂ + y₁y₂ + z₁z₂ = |a||b|cosθ
> 点积=0 → 两向量垂直

**叉积**（向量积）：
a×b 的结果是一个向量，垂直于 a 和 b`,
        formula: 'a·b = x₁x₂ + y₁y₂ + z₁z₂ = |a||b|cosθ',
        example: '**例题**：a=(1,2,0), b=(3,4,0)，求 a·b\n**解**：a·b = 1×3 + 2×4 + 0×0 = 3+8 = 11'
      }
    ],
    practice: [
      {
        question: '向量 a=(1,2,2) 的模长是？',
        answer: '3',
        hint: '|a| = √(1²+2²+2²) = √9 = 3'
      },
      {
        question: 'a=(1,0,0), b=(0,1,0)，a·b = ?',
        answer: '0，所以两向量垂直',
        hint: '点积=0 意味着垂直'
      }
    ]
  },
  {
    id: 5,
    num: '第5章',
    name: '多元函数',
    weight: '12%',
    color: '#ec4899',
    sections: [
      {
        title: '5.1 多元函数的概念',
        content: `**多元函数**就是"输入多个数，输出一个数"的函数。

> 💡 **通俗比喻**：一元函数像只有音量旋钮的音响（一个输入），多元函数像有音量+低音+高音三个旋钮的音响（多个输入）。

**二元函数**：z = f(x, y)
- (x,y) 是输入（两个数）
- z 是输出（一个数）

**定义域**：(x,y) 的取值范围
**图像**：三维空间中的曲面`,
        formula: 'z = f(x, y) \\quad（二元函数）',
        example: '**例题**：求 f(x,y) = √(x² + y² - 1) 的定义域\n**解**：根号内 ≥ 0，即 x² + y² ≥ 1\n定义域为圆外区域（含边界）'
      },
      {
        title: '5.2 偏导数',
        content: `**偏导数**就是"固定其他变量，只对一个变量求导"。

> 💡 **通俗比喻**：调音响时，你只转"音量"旋钮（把低音和高音固定不动），看声音怎么变化——这就是"偏导"。

**记法**：
∂f/∂x：对 x 求偏导（把 y 当常数）
∂f/∂y：对 y 求偏导（把 x 当常数）

**几何意义**：沿 x 方向或 y 方向的切线斜率`,
        formula: '\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x, y)}{h}',
        example: '**例题**：求 f(x,y) = x² + y² 的偏导数\n**解**：∂f/∂x = 2x（把 y² 当常数，导数为0）\n∂f/∂y = 2y（把 x² 当常数，导数为0）'
      }
    ],
    practice: [
      {
        question: 'f(x,y) = xy，求 ∂f/∂x',
        answer: 'y',
        hint: '对 x 求导时，y 当常数'
      },
      {
        question: 'f(x,y) = x²y + y³，求 ∂f/∂y',
        answer: 'x² + 3y²',
        hint: '对 y 求导时，x² 当常数'
      }
    ]
  },
  {
    id: 6,
    num: '第6章',
    name: '重积分与曲线积分',
    weight: '10%',
    color: '#14b8a6',
    sections: [
      {
        title: '6.1 二重积分的概念',
        content: `**二重积分**就是求曲面下方的体积。

> 💡 **通俗比喻**：一元积分求面积（切条），二重积分求体积（切小块）。切得越细越精确。

**记法**：∬_D f(x,y) dxdy
D 是积分区域（平面上的区域）

**计算步骤**：
1. 确定积分区域 D
2. 化为累次积分（先对x再对y，或先对y再对x）
3. 逐层计算`,
        formula: '∬_D f(x,y) dxdy \\quad（二重积分）',
        example: '**例题**：求 ∬_D (x+y) dxdy，D: 0≤x≤1, 0≤y≤1\n**解**：∬_D (x+y) dxdy = ∫₀¹∫₀¹ (x+y) dxdy\n= ∫₀¹ [x²/2 + xy]₀¹ dy\n= ∫₀¹ (1/2 + y) dy = [y/2 + y²/2]₀¹ = 1/2 + 1/2 = 1'
      },
      {
        title: '6.2 累次积分',
        content: `**累次积分**就是把二重积分拆成两次一元积分。

**先 x 后 y**：
∬_D f(x,y) dxdy = ∫_(y₁)^(y₂) [∫_(x₁(y))^(x₂(y)) f(x,y) dx] dy

**先 y 后 x**：
∬_D f(x,y) dxdy = ∫_(x₁)^(x₂) [∫_(y₁(x))^(y₂(x)) f(x,y) dy] dx

> 💡 **记忆**：从内到外，逐层积分。内层积分结果作为外层积分的被积函数。`,
        formula: '∫_a^b [∫_{c}^{d} f(x,y) dx] dy',
        example: '**例题**：求 ∫₀¹∫₀² x²y dxdy\n**解**：先对x：∫₀² x²y dx = y·[x³/3]₀² = (8/3)y\n再对y：∫₀¹ (8/3)y dy = (8/3)·[y²/2]₀¹ = 4/3'
      }
    ],
    practice: [
      {
        question: '∫₀¹∫₀² 1 dxdy = ?',
        answer: '2',
        hint: '先对x积：∫₀² 1 dx = 2，再对y积：∫₀¹ 2 dy = 2'
      },
      {
        question: '∫₀¹∫₀¹ xy dxdy = ?',
        answer: '1/4',
        hint: '先对x积：∫₀¹ x dx = 1/2，再对y积：∫₀¹ y/2 dy = 1/4'
      }
    ]
  },
  {
    id: 7,
    num: '第7章',
    name: '常微分方程',
    weight: '8%',
    color: '#f97316',
    sections: [
      {
        title: '7.1 微分方程的概念',
        content: `**微分方程**就是含有导数的方程。

> 💡 **通俗比喻**：微分方程像"根据速度推位置"——知道物体怎么变化（导数），求物体本身（原函数）。

**阶数**：方程中最高阶导数的阶数
**解**：满足方程的函数
**通解**：含任意常数的解
**特解**：通解中代入初始条件得到的解`,
        formula: "y' = f(x, y) \\quad（一阶微分方程）",
        example: '**例题**：验证 y = eˣ 是 y\' = y 的解\n**解**：y\' = (eˣ)\' = eˣ = y ✅\n所以 y = eˣ 是方程的解'
      },
      {
        title: '7.2 可分离变量方程',
        content: `**形式**：dy/dx = g(x)·h(y)

**解法**：把变量分离到两边，再积分
1. dy/h(y) = g(x) dx
2. 两边同时积分
3. 求出 y 的表达式

> 💡 **记忆口诀**："调皮的小孩分开坐——y 的放左边，x 的放右边，然后各自积分"。`,
        formula: '\\frac{dy}{dx} = g(x)h(y) \\Rightarrow \\frac{dy}{h(y)} = g(x)dx',
        example: '**例题**：求 dy/dx = 2xy 的通解\n**解**：分离变量：dy/y = 2x dx\n两边积分：∫ dy/y = ∫ 2x dx\nln|y| = x² + C\ny = ±e^(x²+C) = C₁e^(x²)（C₁为任意常数）'
      }
    ],
    practice: [
      {
        question: 'dy/dx = 3x²，求通解',
        answer: 'y = x³ + C',
        hint: '两边直接积分'
      },
      {
        question: 'dy/dx = y，且 y(0)=1，求特解',
        answer: 'y = eˣ',
        hint: '分离变量：dy/y = dx，积分得 ln|y| = x + C，代入初始条件'
      }
    ]
  },
  {
    id: 8,
    num: '第8章',
    name: '无穷级数',
    weight: '7%',
    color: '#06b6d4',
    sections: [
      {
        title: '8.1 级数的概念',
        content: `**级数**就是把无穷多个数加起来。

> 💡 **通俗比喻**：你每天存钱，第一天存1元，第二天存1/2元，第三天存1/4元……一直存下去，总钱数会趋近2元——这就是级数求和。

**记法**：∑_{n=1}^{∞} a_n = a₁ + a₂ + a₃ + ...

**部分和**：S_n = a₁ + a₂ + ... + a_n
**收敛**：当 n→∞ 时，S_n 趋于某个有限数
**发散**：当 n→∞ 时，S_n 趋于无穷或无极限`,
        formula: '\\sum_{n=1}^{\\infty} a_n \\quad 收敛：\\lim_{n \\to \\infty} S_n = S（有限）',
        example: '**例题**：判断级数 ∑_{n=1}^{∞} 1/2ⁿ 是否收敛\n**解**：a₁=1/2, a₂=1/4, a₃=1/8...\nS_n = 1 - 1/2ⁿ，当 n→∞ 时 S_n → 1\n所以级数收敛，和为1'
      },
      {
        title: '8.2 幂级数',
        content: `**幂级数**就是"各项是 x 的幂"的级数。

**形式**：∑_{n=0}^{∞} a_n xⁿ = a₀ + a₁x + a₂x² + ...

**收敛半径**：|x| < R 时级数收敛
**求收敛半径**：R = lim_{n→∞} |a_n/a_{n+1}|

> 💡 **通俗记忆**：幂级数像"多项式加到了无穷项"——x 的绝对值足够小时就能收敛。`,
        formula: '\\sum_{n=0}^{\\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + ... \\quad |x| < R \\text{ 时收敛}',
        example: '**例题**：求级数 ∑_{n=0}^{∞} xⁿ 的收敛半径\n**解**：a_n = 1，R = lim |1/1| = 1\n|x| < 1 时收敛，和为 1/(1-x)'
      }
    ],
    practice: [
      {
        question: '级数 ∑_{n=1}^{∞} 1/n 收敛还是发散？',
        answer: '发散（调和级数）',
        hint: '调和级数 ∑ 1/n 是发散的'
      },
      {
        question: '∑_{n=0}^{∞} (1/2)ⁿ 的和是？',
        answer: '2',
        hint: '等比级数，公比 r=1/2，和 = 1/(1-r) = 2'
      }
    ]
  }
]

export function getChapterProgress() {
  try {
    const saved = localStorage.getItem('bencetong_chapter_progress')
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

export function saveChapterProgress(chapterId, completed) {
  const progress = getChapterProgress()
  progress[chapterId] = completed
  localStorage.setItem('bencetong_chapter_progress', JSON.stringify(progress))
  return progress
}

export function getTodayStudyTime() {
  try {
    const saved = localStorage.getItem('bencetong_today_study')
    return saved ? JSON.parse(saved) : { date: '', minutes: 0 }
  } catch {
    return { date: '', minutes: 0 }
  }
}

export function saveTodayStudyTime(minutes) {
  const today = new Date().toLocaleDateString('zh-CN')
  localStorage.setItem('bencetong_today_study', JSON.stringify({ date: today, minutes }))
}