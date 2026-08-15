# C语言代码示例库 — 广东专升本计算机基础与程序设计

> 本参考涵盖 C 语言基础（1-14）与数据结构（15-21），共 21 个专题。  
> 每个示例均提供完整可运行的代码、中文注释以及输入输出样例。  
> 适用于 **广东专插本 / 专升本 · 计算机基础与程序设计** 备考。

---

## 目录

### C语言基础部分
- [1. Hello World 程序结构](#1-hello-world-程序结构)
- [2. 变量定义与数据类型](#2-变量定义与数据类型)
- [3. 输入输出](#3-输入输出)
- [4. 运算符](#4-运算符)
- [5. 选择结构](#5-选择结构)
- [6. 循环结构](#6-循环结构)
- [7. 一维数组和二维数组](#7-一维数组和二维数组)
- [8. 字符串和字符数组](#8-字符串和字符数组)
- [9. 函数定义调用与参数传递](#9-函数定义调用与参数传递)
- [10. 指针](#10-指针)
- [11. 结构体](#11-结构体)
- [12. 文件操作](#12-文件操作)
- [13. 动态内存分配](#13-动态内存分配)
- [14. 预处理指令](#14-预处理指令)

### 数据结构部分
- [15. 顺序表操作](#15-顺序表操作)
- [16. 单链表操作](#16-单链表操作)
- [17. 栈操作](#17-栈操作)
- [18. 队列操作](#18-队列操作)
- [19. 二叉树遍历](#19-二叉树遍历)
- [20. 冒泡排序选择排序插入排序](#20-冒泡排序选择排序插入排序)
- [21. 顺序查找折半查找](#21-顺序查找折半查找)

---

## 1. Hello World 程序结构

```c
#include <stdio.h>   // 标准输入输出头文件

// main 函数 —— 程序入口
int main() {
    // printf 是标准输出函数，"" 中的内容原样打印
    printf("Hello, World!\n");   // \n 表示换行
    return 0;                    // 返回 0 表示程序正常结束
}
```

**输出：**
```
Hello, World!
```

**要点：**
- `#include <stdio.h>` 包含标准 I/O 库
- `int main()` 主函数，程序从这里开始执行
- `printf()` 格式化输出
- `return 0;` 表示成功退出

---

## 2. 变量定义与数据类型

```c
#include <stdio.h>

int main() {
    // ------ 基本数据类型 ------
    int a = 10;               // 整型，占 4 字节
    float b = 3.14f;          // 单精度浮点，占 4 字节，后面加 f
    double c = 3.1415926535;  // 双精度浮点，占 8 字节，精度更高
    char d = 'A';             // 字符型，占 1 字节，用单引号

    // ------ 格式化输出 ------
    printf("int    a = %d\n", a);       // %d 输出整数
    printf("float  b = %.2f\n", b);     // %.2f 保留两位小数
    printf("double c = %.10lf\n", c);   // %lf 输出 double
    printf("char   d = %c\n", d);       // %c 输出字符
    printf("char   d 的 ASCII = %d\n", d); // 字符也可用 %d 输出 ASCII 码

    // ------ 修饰符 ------
    short int si = 32767;               // 短整型，占 2 字节
    long int li = 100000L;              // 长整型，占 4 或 8 字节
    unsigned int ui = 40000U;           // 无符号整型，只能存非负数

    printf("short  si = %d\n", si);
    printf("long   li = %ld\n", li);
    printf("unsigned ui = %u\n", ui);

    // ------ sizeof 查看字节数 ------
    printf("\n--- 各类型字节数 ---\n");
    printf("int:     %zu 字节\n", sizeof(int));
    printf("float:   %zu 字节\n", sizeof(float));
    printf("double:  %zu 字节\n", sizeof(double));
    printf("char:    %zu 字节\n", sizeof(char));
    printf("short:   %zu 字节\n", sizeof(short));
    printf("long:    %zu 字节\n", sizeof(long));

    return 0;
}
```

**输出：**
```
int    a = 10
float  b = 3.14
double c = 3.1415926535
char   d = A
char   d 的 ASCII = 65
short  si = 32767
long   li = 100000
unsigned ui = 40000

--- 各类型字节数 ---
int:     4 字节
float:   4 字节
double:  8 字节
char:    1 字节
short:   2 字节
long:    4 字节
```

---

## 3. 输入输出

### 3.1 printf 与 scanf

```c
#include <stdio.h>

int main() {
    int age;
    float score;
    char grade;
    char name[50];  // 字符数组，用于存放字符串

    // ------ 输入 ------
    printf("请输入姓名：");
    scanf("%s", name);          // %s 输入字符串，name 不加 &（数组名本身就是地址）

    printf("请输入年龄：");
    scanf("%d", &age);          // %d 输入整数，& 取地址

    printf("请输入成绩：");
    scanf("%f", &score);        // %f 输入浮点数

    printf("请输入等级(A/B/C/D)：");
    scanf(" %c", &grade);       // %c 前面加空格 吃掉上一行的换行符

    // ------ 输出 ------
    printf("\n======= 学生信息 =======\n");
    printf("姓名：%s\n", name);
    printf("年龄：%d 岁\n", age);
    printf("成绩：%.1f 分\n", score);
    printf("等级：%c\n", grade);

    return 0;
}
```

**输入/输出：**
```
请输入姓名：张三
请输入年龄：20
请输入成绩：88.5
请输入等级(A/B/C/D)：A

======= 学生信息 =======
姓名：张三
年龄：20 岁
成绩：88.5 分
等级：A
```

### 3.2 getchar 与 putchar

```c
#include <stdio.h>

int main() {
    char ch;

    printf("请输入一个字符：");
    ch = getchar();          // 从键盘读入一个字符（包括换行符）

    printf("您输入的字符是：");
    putchar(ch);             // 输出一个字符
    putchar('\n');           // 输出换行

    // 循环读取直到遇到换行
    printf("请输入一串字符（回车结束）：\n");
    getchar();               // 吃掉上一行遗留的换行符
    while ((ch = getchar()) != '\n') {
        putchar(ch);
    }
    putchar('\n');

    return 0;
}
```

**输入/输出：**
```
请输入一个字符：X
您输入的字符是：X
请输入一串字符（回车结束）：
Hello!
Hello!
```

### 3.3 puts 与 gets

```c
#include <stdio.h>

int main() {
    char str[100];

    // gets 可以读取带空格的字符串（不安全，但考试常用）
    printf("请输入一行文字（可包含空格）：");
    gets(str);               // 读取整行，直到遇到换行符

    // puts 输出字符串并自动换行
    puts("您输入的是：");
    puts(str);               // puts 自动加换行

    return 0;
}
```

**输入/输出：**
```
请输入一行文字（可包含空格）：I love C language
您输入的是：
I love C language
```

> ⚠️ `gets` 存在缓冲区溢出风险，考试中可用；实际开发建议用 `fgets`。

---

## 4. 运算符

```c
#include <stdio.h>

int main() {
    int a = 10, b = 3, result;

    // ------ 1. 算术运算符 ------
    printf("====== 算术运算符 ======\n");
    printf("a + b = %d\n", a + b);   // 加法 13
    printf("a - b = %d\n", a - b);   // 减法 7
    printf("a * b = %d\n", a * b);   // 乘法 30
    printf("a / b = %d\n", a / b);   // 整除 3（整数除法舍去小数）
    printf("a %% b = %d\n", a % b);  // 取余 1
    // 注意：% 在 printf 中要写成 %%

    // 浮点数除法
    float x = 10.0, y = 3.0;
    printf("10.0 / 3.0 = %.2f\n", x / y);  // 3.33

    // ------ 2. 关系运算符 ------
    printf("\n====== 关系运算符 ======\n");
    printf("a > b  : %d\n", a > b);   // 1 (真)
    printf("a < b  : %d\n", a < b);   // 0 (假)
    printf("a == b : %d\n", a == b);  // 0
    printf("a != b : %d\n", a != b);  // 1
    printf("a >= b : %d\n", a >= b);  // 1
    printf("a <= b : %d\n", a <= b);  // 0

    // ------ 3. 逻辑运算符 ------
    printf("\n====== 逻辑运算符 ======\n");
    int m = 1, n = 0;
    printf("m && n  : %d\n", m && n);  // 逻辑与，0
    printf("m || n  : %d\n", m || n);  // 逻辑或，1
    printf("!m      : %d\n", !m);      // 逻辑非，0
    printf("!n      : %d\n", !n);      // 1

    // 短路特性
    int p = 0, q = 5;
    result = (p != 0) && (q = 100);  // p=0 左边假，右边不执行
    printf("短路与：result=%d, q=%d\n", result, q);  // result=0, q=5

    result = (p == 0) || (q = 200);  // p=0 左边真，右边不执行
    printf("短路或：result=%d, q=%d\n", result, q);  // result=1, q=5

    // ------ 4. 赋值运算符 ------
    printf("\n====== 赋值运算符 ======\n");
    int c = 10;
    c += 5;   printf("c += 5  -> %d\n", c);   // 15
    c -= 3;   printf("c -= 3  -> %d\n", c);   // 12
    c *= 2;   printf("c *= 2  -> %d\n", c);   // 24
    c /= 4;   printf("c /= 4  -> %d\n", c);   // 6
    c %= 2;   printf("c %%= 2 -> %d\n", c);   // 0

    // ------ 5. 自增自减 ------
    printf("\n====== 自增自减 ======\n");
    int i = 5, j;
    j = i++;   // 先赋值后自增：j=5, i=6
    printf("j = i++: j=%d, i=%d\n", j, i);

    i = 5;
    j = ++i;   // 先自增后赋值：i=6, j=6
    printf("j = ++i: j=%d, i=%d\n", j, i);

    i = 5;
    j = i--;   // 先赋值后自减：j=5, i=4
    printf("j = i--: j=%d, i=%d\n", j, i);

    i = 5;
    j = --i;   // 先自减后赋值：i=4, j=4
    printf("j = --i: j=%d, i=%d\n", j, i);

    // ------ 6. 位运算符 ------
    printf("\n====== 位运算符 ======\n");
    unsigned char u1 = 0x0F;  // 0000 1111
    unsigned char u2 = 0x33;  // 0011 0011

    printf("u1 & u2  = 0x%02X\n", u1 & u2);   // 按位与  0000 0011 = 0x03
    printf("u1 | u2  = 0x%02X\n", u1 | u2);   // 按位或  0011 1111 = 0x3F
    printf("u1 ^ u2  = 0x%02X\n", u1 ^ u2);   // 按位异或 0011 1100 = 0x3C
    printf("~u1      = 0x%02X\n", (unsigned char)~u1); // 按位取反 1111 0000 = 0xF0

    unsigned char shift = 0x01;
    printf("1 << 3   = %d\n", shift << 3);    // 左移 3 位：1 → 8
    printf("8 >> 2   = %d\n", (8 >> 2));      // 右移 2 位：8 → 2

    // 用位运算判断奇偶
    int num = 7;
    if (num & 1) {
        printf("%d 是奇数\n", num);
    } else {
        printf("%d 是偶数\n", num);
    }

    // ------ 7. 逗号运算符 ------
    printf("\n====== 逗号运算符 ======\n");
    int val;
    val = (1, 2, 3, 4, 5);           // 逗号表达式取最后一个值
    printf("逗号表达式结果：%d\n", val);  // 5

    // 常用于 for 循环
    int sum = 0;
    for (int k = 0, t = 10; k <= t; k++, t--) {
        sum += k + t;
    }
    printf("逗号表达式在 for 中：sum = %d\n", sum);

    // ------ 8. 条件运算符（三目运算符） ------
    printf("\n====== 条件运算符 ======\n");
    int max = (a > b) ? a : b;       // 如果 a>b 则取 a，否则取 b
    printf("a 和 b 中较大的是：%d\n", max);

    // ------ 9. sizeof 运算符 ------
    printf("\n====== sizeof 运算符 ======\n");
    printf("sizeof(int)  = %zu\n", sizeof(int));
    printf("sizeof(a)    = %zu\n", sizeof(a));

    int arr[10];
    printf("sizeof(arr)  = %zu\n", sizeof(arr));       // 40 = 10 * 4
    printf("数组元素个数 = %zu\n", sizeof(arr) / sizeof(arr[0]));  // 10

    return 0;
}
```

**输出：**
```
====== 算术运算符 ======
a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
10.0 / 3.0 = 3.33

====== 关系运算符 ======
a > b  : 1
a < b  : 0
a == b : 0
a != b : 1
a >= b : 1
a <= b : 0

====== 逻辑运算符 ======
m && n  : 0
m || n  : 1
!m      : 0
!n      : 1
短路与：result=0, q=5
短路或：result=1, q=5

====== 赋值运算符 ======
c += 5  -> 15
c -= 3  -> 12
c *= 2  -> 24
c /= 4  -> 6
c %= 2 -> 0

====== 自增自减 ======
j = i++: j=5, i=6
j = ++i: j=6, i=6
j = i--: j=5, i=4
j = --i: j=4, i=4

====== 位运算符 ======
u1 & u2  = 0x03
u1 | u2  = 0x3F
u1 ^ u2  = 0x3C
~u1      = 0xF0
1 << 3   = 8
8 >> 2   = 2
7 是奇数

====== 逗号运算符 ======
逗号表达式结果：5
逗号表达式在 for 中：sum = 55

====== 条件运算符 ======
a 和 b 中较大的是：10

====== sizeof 运算符 ======
sizeof(int)  = 4
sizeof(a)    = 4
sizeof(arr)  = 40
数组元素个数 = 10
```

---

## 5. 选择结构

### 5.1 if-else if-else

```c
#include <stdio.h>

int main() {
    int score;

    printf("请输入成绩（0-100）：");
    scanf("%d", &score);

    // 多分支选择
    if (score < 0 || score > 100) {
        printf("成绩无效！\n");
    } else if (score >= 90) {
        printf("等级：优秀\n");
    } else if (score >= 80) {
        printf("等级：良好\n");
    } else if (score >= 70) {
        printf("等级：中等\n");
    } else if (score >= 60) {
        printf("等级：及格\n");
    } else {
        printf("等级：不及格\n");
    }

    // 嵌套 if 示例：判断闰年
    int year;
    printf("\n请输入年份：");
    scanf("%d", &year);

    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                printf("%d 年是闰年\n", year);
            } else {
                printf("%d 年不是闰年\n", year);
            }
        } else {
            printf("%d 年是闰年\n", year);
        }
    } else {
        printf("%d 年不是闰年\n", year);
    }

    // 更简洁的写法（逻辑运算符）
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("（简洁判断）%d 年是闰年\n", year);
    } else {
        printf("（简洁判断）%d 年不是闰年\n", year);
    }

    return 0;
}
```

**输入/输出：**
```
请输入成绩（0-100）：85
等级：良好

请输入年份：2024
2024 年是闰年
（简洁判断）2024 年是闰年
```

### 5.2 switch-case

```c
#include <stdio.h>

int main() {
    int month;

    printf("请输入月份（1-12）：");
    scanf("%d", &month);

    // switch 判断季节
    switch (month) {
        case 3:
        case 4:
        case 5:
            printf("%d 月是春季\n", month);
            break;          // break 跳出 switch，否则会"穿透"到下一 case
        case 6:
        case 7:
        case 8:
            printf("%d 月是夏季\n", month);
            break;
        case 9:
        case 10:
        case 11:
            printf("%d 月是秋季\n", month);
            break;
        case 12:
        case 1:
        case 2:
            printf("%d 月是冬季\n", month);
            break;
        default:            // 上面所有 case 都不匹配时执行
            printf("月份无效！\n");
    }

    // switch 穿透示例（故意不加 break）
    int n = 2;
    printf("\nswitch 穿透演示（n=%d）：\n", n);
    switch (n) {
        case 1:
            printf("case 1\n");
        case 2:
            printf("case 2\n");  // 从这里进入
        case 3:
            printf("case 3\n");  // 继续往下执行
        case 4:
            printf("case 4\n");
            break;               // 到这里才跳出
        default:
            printf("default\n");
    }

    return 0;
}
```

**输入/输出：**
```
请输入月份（1-12）：8
8 月是夏季

switch 穿透演示（n=2）：
case 2
case 3
case 4
```

---

## 6. 循环结构

### 6.1 for 循环

```c
#include <stdio.h>

int main() {
    // 计算 1 到 100 的和
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;                // sum = sum + i
    }
    printf("1 + 2 + ... + 100 = %d\n", sum);

    // 九九乘法表
    printf("\n====== 九九乘法表 ======\n");
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d×%d=%-2d ", j, i, i * j);  // %-2d 左对齐，占2位
        }
        printf("\n");  // 每行换行
    }

    // 循环嵌套：打印菱形
    printf("\n====== 菱形图案 ======\n");
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++) {
            printf(" ");
        }
        for (int k = 1; k <= 2 * i - 1; k++) {
            printf("*");
        }
        printf("\n");
    }
    for (int i = n - 1; i >= 1; i--) {
        for (int j = 1; j <= n - i; j++) {
            printf(" ");
        }
        for (int k = 1; k <= 2 * i - 1; k++) {
            printf("*");
        }
        printf("\n");
    }

    return 0;
}
```

**输出：**
```
1 + 2 + ... + 100 = 5050

====== 九九乘法表 ======
1×1=1
1×2=2  2×2=4
1×3=3  2×3=6  3×3=9
1×4=4  2×4=8  3×4=12 4×4=16
1×5=5  2×5=10 3×5=15 4×5=20 5×5=25
1×6=6  2×6=12 3×6=18 4×6=24 5×6=30 6×6=36
1×7=7  2×7=14 3×7=21 4×7=28 5×7=35 6×7=42 7×7=49
1×8=8  2×8=16 3×8=24 4×8=32 5×8=40 6×8=48 7×8=56 8×8=64
1×9=9  2×9=18 3×9=27 4×9=36 5×9=45 6×9=54 7×9=63 8×9=72 9×9=81

====== 菱形图案 ======
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```

### 6.2 while 循环

```c
#include <stdio.h>

int main() {
    // 输入一个正整数，逆序输出其各位数字
    int num, digit;

    printf("请输入一个正整数：");
    scanf("%d", &num);

    printf("逆序输出：");
    while (num > 0) {
        digit = num % 10;   // 取最后一位
        printf("%d", digit);
        num /= 10;           // 去掉最后一位
    }
    printf("\n");

    // 用 while 计算数字位数
    int count = 0, temp;
    printf("请输入一个整数：");
    scanf("%d", &temp);

    if (temp == 0) {
        count = 1;
    } else {
        int abs_temp = (temp < 0) ? -temp : temp;  // 处理负数
        while (abs_temp > 0) {
            abs_temp /= 10;
            count++;
        }
    }
    printf("该数字有 %d 位\n", count);

    return 0;
}
```

**输入/输出：**
```
请输入一个正整数：12345
逆序输出：54321
请输入一个整数：-9876
该数字有 4 位
```

### 6.3 do-while 循环

```c
#include <stdio.h>

int main() {
    // 猜数字游戏（do-while 保证至少执行一次）
    int target = 42;   // 目标数字
    int guess;

    printf("猜数字游戏（1-100）\n");
    do {
        printf("请输入你的猜测：");
        scanf("%d", &guess);

        if (guess > target) {
            printf("猜大了！\n");
        } else if (guess < target) {
            printf("猜小了！\n");
        } else {
            printf("恭喜你，猜对了！\n");
        }
    } while (guess != target);   // 猜对时结束

    // 用 do-while 实现菜单循环
    int choice;
    do {
        printf("\n====== 菜单 ======\n");
        printf("1. 查询余额\n");
        printf("2. 取款\n");
        printf("3. 存款\n");
        printf("0. 退出\n");
        printf("请选择：");
        scanf("%d", &choice);

        switch (choice) {
            case 1: printf("您的余额为 10000 元\n"); break;
            case 2: printf("请输入取款金额\n"); break;
            case 3: printf("请输入存款金额\n"); break;
            case 0: printf("谢谢使用\n"); break;
            default: printf("无效选择\n");
        }
    } while (choice != 0);

    return 0;
}
```

**输入/输出：**
```
猜数字游戏（1-100）
请输入你的猜测：50
猜大了！
请输入你的猜测：25
猜小了！
请输入你的猜测：42
恭喜你，猜对了！

====== 菜单 ======
1. 查询余额
2. 取款
3. 存款
0. 退出
请选择：1
您的余额为 10000 元

====== 菜单 ======
0. 退出
谢谢使用
```

### 6.4 break 与 continue

```c
#include <stdio.h>

int main() {
    // break：跳出整个循环
    printf("====== break 演示 ======\n");
    printf("找出 1-100 中第一个能被 3 和 7 同时整除的数：\n");
    for (int i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 7 == 0) {
            printf("找到：%d\n", i);
            break;              // 找到后立即跳出循环
        }
    }

    // continue：跳过本次循环的剩余语句，进入下一次循环
    printf("\n====== continue 演示 ======\n");
    printf("1-20 中不能被 3 整除的数：\n");
    for (int i = 1; i <= 20; i++) {
        if (i % 3 == 0) {
            continue;           // 跳过 i 能被 3 整除的情况
        }
        printf("%d ", i);
    }
    printf("\n");

    // 综合：判断素数
    printf("\n====== 判断素数 ======\n");
    int num, isPrime = 1;

    printf("请输入一个正整数：");
    scanf("%d", &num);

    if (num <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= num; i++) {  // 只需检查到 sqrt(num)
            if (num % i == 0) {
                isPrime = 0;
                break;          // 找到因子，不是素数，立即退出
            }
        }
    }

    if (isPrime) {
        printf("%d 是素数\n", num);
    } else {
        printf("%d 不是素数\n", num);
    }

    return 0;
}
```

**输出：**
```
====== break 演示 ======
找出 1-100 中第一个能被 3 和 7 同时整除的数：
找到：21

====== continue 演示 ======
1-20 中不能被 3 整除的数：
1 2 4 5 7 8 10 11 13 14 16 17 19 20

====== 判断素数 ======
请输入一个正整数：97
97 是素数
```

---

## 7. 一维数组和二维数组

### 7.1 一维数组

```c
#include <stdio.h>

#define SIZE 10

int main() {
    // ------ 数组的定义与初始化 ------
    int arr1[5];                     // 未初始化，元素为随机值
    int arr2[5] = {1, 2, 3, 4, 5};  // 完全初始化
    int arr3[5] = {1, 2};           // 部分初始化，其余为 0
    int arr4[] = {10, 20, 30};      // 省略大小，自动推导为 3

    // 输出数组元素
    printf("arr2: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr2[i]);
    }
    printf("\n");

    printf("arr3: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr3[i]);      // 输出：1 2 0 0 0
    }
    printf("\n");

    // ------ 数组输入与操作 ------
    int scores[SIZE];

    printf("请输入 %d 个成绩：\n", SIZE);
    for (int i = 0; i < SIZE; i++) {
        printf("成绩 %d：", i + 1);
        scanf("%d", &scores[i]);
    }

    // 求最大值、最小值、平均分
    int max = scores[0];
    int min = scores[0];
    int sum = 0;

    for (int i = 0; i < SIZE; i++) {
        if (scores[i] > max) max = scores[i];
        if (scores[i] < min) min = scores[i];
        sum += scores[i];
    }

    double avg = (double)sum / SIZE;  // 强制类型转换，避免整数除法

    printf("\n====== 成绩统计 ======\n");
    printf("最高分：%d\n", max);
    printf("最低分：%d\n", min);
    printf("平均分：%.1f\n", avg);

    // ------ 数组反转 ------
    int arr[] = {1, 2, 3, 4, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("\n原数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    // 双指针反转
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    printf("\n反转后：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    // ------ 数组的越界访问（危险！仅演示） ------
    // 考试常考：数组下标从 0 开始，最大下标为 n-1
    printf("\n注意：数组下标从 0 到 %d\n", n - 1);

    return 0;
}
```

**输入/输出：**
```
arr2: 1 2 3 4 5
arr3: 1 2 0 0 0
请输入 10 个成绩：
成绩 1：88
成绩 2：75
成绩 3：92
成绩 4：60
成绩 5：85
成绩 6：70
成绩 7：95
成绩 8：80
成绩 9：68
成绩 10：78

====== 成绩统计 ======
最高分：95
最低分：60
平均分：79.1

原数组：1 2 3 4 5 6
反转后：6 5 4 3 2 1
注意：数组下标从 0 到 5
```

### 7.2 二维数组

```c
#include <stdio.h>

int main() {
    // ------ 二维数组的定义与初始化 ------
    int matrix1[3][4];                       // 3 行 4 列，未初始化
    int matrix2[2][3] = {{1, 2, 3}, {4, 5, 6}};  // 按行初始化
    int matrix3[2][3] = {1, 2, 3, 4, 5, 6};     // 按内存顺序初始化
    int matrix4[][3] = {{1, 2, 3}, {4, 5, 6}};  // 第一维可省略

    // 输出二维数组
    printf("matrix2（2行3列）：\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix2[i][j]);
        }
        printf("\n");
    }

    // ------ 矩阵输入与转置 ------
    int rows = 2, cols = 3;
    int mat[2][3], trans[3][2];

    printf("\n请输入 %d×%d 矩阵的元素：\n", rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("mat[%d][%d] = ", i, j);
            scanf("%d", &mat[i][j]);
        }
    }

    // 计算转置
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            trans[j][i] = mat[i][j];
        }
    }

    printf("\n原矩阵：\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%5d", mat[i][j]);
        }
        printf("\n");
    }

    printf("\n转置矩阵（%d×%d）：\n", cols, rows);
    for (int i = 0; i < cols; i++) {
        for (int j = 0; j < rows; j++) {
            printf("%5d", trans[i][j]);
        }
        printf("\n");
    }

    // ------ 二维数组求和 ------
    int A[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int sum = 0;

    // 求主对角线元素之和
    for (int i = 0; i < 3; i++) {
        sum += A[i][i];
    }
    printf("\n主对角线元素之和：%d\n", sum);

    // 求周边元素之和
    sum = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == 0 || i == 2 || j == 0 || j == 2) {
                sum += A[i][j];
            }
        }
    }
    printf("周边元素之和：%d\n", sum);

    return 0;
}
```

**输入/输出：**
```
matrix2（2行3列）：
1 2 3
4 5 6

请输入 2×3 矩阵的元素：
mat[0][0] = 1
mat[0][1] = 2
mat[0][2] = 3
mat[1][0] = 4
mat[1][1] = 5
mat[1][2] = 6

原矩阵：
    1    2    3
    4    5    6

转置矩阵（3×2）：
    1    4
    2    5
    3    6

主对角线元素之和：15
周边元素之和：40
```

---

## 8. 字符串和字符数组

```c
#include <stdio.h>
#include <string.h>   // 字符串处理函数

int main() {
    // ------ 字符串的两种表示方式 ------
    char str1[] = "Hello";      // 字符数组，自动加 '\0'，大小 6
    char str2[20] = "World";    // 指定大小，剩余填 '\0'
    char *str3 = "C Language";  // 字符串常量，不可修改

    printf("str1 = %s\n", str1);
    printf("str2 = %s\n", str2);
    printf("str3 = %s\n", str3);

    // 字符数组逐个字符输出
    printf("str1 逐个字符：");
    for (int i = 0; str1[i] != '\0'; i++) {  // '\0' 是字符串结束标志
        printf("%c ", str1[i]);
    }
    printf("\n");

    // ------ strlen：求字符串长度（不含 '\0'） ------
    char s1[] = "Hello";
    printf("strlen(\"%s\") = %zu\n", s1, strlen(s1));  // 5
    printf("sizeof(\"%s\") = %zu\n", s1, sizeof(s1));  // 6（含 '\0'）

    // ------ strcpy：字符串复制 ------
    char dest[20];
    strcpy(dest, "Copy me!");        // 将 "Copy me!" 复制到 dest
    printf("strcpy 结果：%s\n", dest);

    // ------ strcat：字符串拼接 ------
    char cat[30] = "Hello, ";
    strcat(cat, "World!");           // 将 "World!" 拼接到 cat 末尾
    printf("strcat 结果：%s\n", cat);

    // ------ strcmp：字符串比较 ------
    // 返回值：相等返回 0，s1 < s2 返回负数，s1 > s2 返回正数
    char *a = "apple";
    char *b = "banana";
    int cmp = strcmp(a, b);
    printf("strcmp(\"%s\", \"%s\") = %d\n", a, b, cmp);
    // 按 ASCII 字典序比较：'a' < 'b'，所以返回负数

    if (strcmp(a, "apple") == 0) {
        printf("两个字符串相等\n");
    }

    // ------ 字符串常用操作：转换大小写 ------
    char text[] = "Hello, China!";
    printf("\n原字符串：%s\n", text);

    // 转大写
    for (int i = 0; text[i] != '\0'; i++) {
        if (text[i] >= 'a' && text[i] <= 'z') {
            text[i] = text[i] - 32;   // 'a' - 'A' = 32
        }
    }
    printf("转大写：%s\n", text);

    // 转小写
    for (int i = 0; text[i] != '\0'; i++) {
        if (text[i] >= 'A' && text[i] <= 'Z') {
            text[i] = text[i] + 32;
        }
    }
    printf("转小写：%s\n", text);

    // ------ 字符串输入 ------
    char name[50];
    printf("\n请输入你的名字：");
    scanf("%s", name);          // %s 遇到空格/换行停止
    printf("你好，%s！\n", name);

    // 清空输入缓冲区
    while (getchar() != '\n');

    // 读取带空格的字符串
    char fullname[100];
    printf("请输入你的全名（可包含空格）：");
    gets(fullname);             // 读取整行（考试常用，有风险）
    printf("你的全名是：%s\n", fullname);

    return 0;
}
```

**输入/输出：**
```
str1 = Hello
str2 = World
str3 = C Language
str1 逐个字符：H e l l o
strlen("Hello") = 5
sizeof("Hello") = 6
strcpy 结果：Copy me!
strcat 结果：Hello, World!
strcmp("apple", "banana") = -1
两个字符串相等

原字符串：Hello, China!
转大写：HELLO, CHINA!
转小写：hello, china!

请输入你的名字：Alice
你好，Alice！
请输入你的全名（可包含空格）：Alice Wang
你的全名是：Alice Wang
```

---

## 9. 函数定义调用与参数传递

### 9.1 函数基本用法

```c
#include <stdio.h>

// 函数声明（原型声明）：告诉编译器有这样一个函数
// 返回类型 函数名(参数类型 参数名, ...);
int add(int a, int b);
void printGreeting(char name[]);
int factorial(int n);
int gcd(int a, int b);

int main() {
    // 调用函数
    int sum = add(10, 20);
    printf("10 + 20 = %d\n", sum);

    printGreeting("小明");

    // 计算 5!
    printf("5! = %d\n", factorial(5));

    // 求最大公约数
    printf("gcd(12, 18) = %d\n", gcd(12, 18));

    return 0;
}

// 函数定义：两数相加
int add(int a, int b) {
    return a + b;        // return 返回结果
}

// 无返回值函数（void），打印问候
void printGreeting(char name[]) {
    printf("你好，%s！欢迎学习C语言！\n", name);
    // return;  // void 函数可以省略 return
}

// 递归函数：计算阶乘
// n! = n * (n-1)!
int factorial(int n) {
    if (n <= 1) {
        return 1;        // 递归出口
    }
    return n * factorial(n - 1);  // 递归调用
}

// 辗转相除法求最大公约数
int gcd(int a, int b) {
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}
```

**输出：**
```
10 + 20 = 30
你好，小明！欢迎学习C语言！
5! = 120
gcd(12, 18) = 6
```

### 9.2 值传递 vs 地址传递

```c
#include <stdio.h>

// 值传递：形参改变不影响实参
void swapByValue(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    printf("  函数内部：x=%d, y=%d\n", x, y);
}

// 地址传递（指针）：通过指针修改实参
void swapByPointer(int *px, int *py) {
    int temp = *px;    // *px 取指针指向的值
    *px = *py;
    *py = temp;
}

// 地址传递：通过数组参数修改数组
void doubleArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] *= 2;
    }
}

// 返回多个值：通过指针参数
void calcCircle(double r, double *pArea, double *pCircumference) {
    const double PI = 3.14159;
    *pArea = PI * r * r;
    *pCircumference = 2 * PI * r;
}

int main() {
    // 值传递演示
    int a = 5, b = 10;
    printf("值传递：\n");
    printf("  调用前：a=%d, b=%d\n", a, b);
    swapByValue(a, b);           // 传值，a,b 的值被复制给 x,y
    printf("  调用后：a=%d, b=%d（不变）\n", a, b);

    // 地址传递演示
    printf("\n地址传递（指针）：\n");
    printf("  调用前：a=%d, b=%d\n", a, b);
    swapByPointer(&a, &b);       // 传地址，函数通过指针修改 a,b
    printf("  调用后：a=%d, b=%d（已交换）\n", a, b);

    // 数组作为参数（自动传地址）
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("\n数组作为参数：\n");
    printf("  调用前：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    doubleArray(arr, n);         // 数组名即地址，传地址

    printf("  调用后：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    // 通过指针参数返回多个值
    double radius = 5.0;
    double area, circumference;
    calcCircle(radius, &area, &circumference);

    printf("\n半径 r=%.1f 的圆：\n", radius);
    printf("  面积 = %.2f\n", area);
    printf("  周长 = %.2f\n", circumference);

    return 0;
}
```

**输出：**
```
值传递：
  调用前：a=5, b=10
  函数内部：x=10, y=5
  调用后：a=5, b=10（不变）

地址传递（指针）：
  调用前：a=5, b=10
  调用后：a=10, b=5（已交换）

数组作为参数：
  调用前：1 2 3 4 5
  调用后：2 4 6 8 10

半径 r=5.0 的圆：
  面积 = 78.54
  周长 = 31.42
```

---

## 10. 指针

### 10.1 指针基础

```c
#include <stdio.h>

int main() {
    // ------ 指针的定义与基本操作 ------
    int a = 10;
    int *p = &a;       // p 是指向 int 的指针，存放 a 的地址

    printf("a 的值：%d\n", a);          // 10
    printf("a 的地址：%p\n", &a);       // & 取地址运算符
    printf("p 的值（地址）：%p\n", p);   // 与 &a 相同
    printf("p 指向的值：%d\n", *p);     // * 解引用，10

    // 通过指针修改变量的值
    *p = 20;           // 等价于 a = 20
    printf("通过指针修改后 a = %d\n", a);  // 20

    // ------ 指针的算术运算 ------
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;    // 指向数组首元素

    printf("\n====== 指针算术运算 ======\n");
    printf("ptr = %p, *ptr = %d\n", ptr, *ptr);       // 第一个元素
    printf("ptr + 1 = %p, *(ptr+1) = %d\n", ptr + 1, *(ptr + 1));  // 第二个元素
    printf("ptr + 2 = %p, *(ptr+2) = %d\n", ptr + 2, *(ptr + 2));  // 第三个元素

    // 指针递增遍历数组
    printf("\n指针遍历数组：\n");
    for (int *p = arr; p < arr + 5; p++) {
        printf("%d ", *p);
    }
    printf("\n");

    // 指针相减：得到元素个数
    int *start = &arr[0];
    int *end = &arr[4];
    printf("end - start = %td\n", end - start);  // 4

    // ------ 指针与数组的等价关系 ------
    // arr[i] 等价于 *(arr + i)
    printf("\n指针与数组的等价关系：\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, *(arr+%d) = %d, p[%d] = %d\n",
               i, arr[i], i, *(arr + i), i, ptr[i]);
    }

    // ------ 空指针与野指针 ------
    int *nullPtr = NULL;   // 空指针，不指向任何有效地址
    // *nullPtr = 10;      // 错误！不能对空指针解引用

    // 使用前检查
    if (nullPtr != NULL) {
        printf("指针有效\n");
    } else {
        printf("指针为空\n");
    }

    return 0;
}
```

**输出：**
```
a 的值：10
a 的地址：000000000061FE14
p 的值（地址）：000000000061FE14
p 指向的值：10
通过指针修改后 a = 20

====== 指针算术运算 ======
ptr = 000000000061FDF0, *ptr = 10
ptr + 1 = 000000000061FDF4, *(ptr+1) = 20
ptr + 2 = 000000000061FDF8, *(ptr+2) = 30

指针遍历数组：
10 20 30 40 50
end - start = 4

指针与数组的等价关系：
arr[0] = 10, *(arr+0) = 10, p[0] = 10
arr[1] = 20, *(arr+1) = 20, p[1] = 20
arr[2] = 30, *(arr+2) = 30, p[2] = 30
arr[3] = 40, *(arr+3) = 40, p[3] = 40
arr[4] = 50, *(arr+4) = 50, p[4] = 50

指针为空
```

### 10.2 指针数组与数组指针

```c
#include <stdio.h>

int main() {
    // ------ 指针数组：数组的每个元素都是指针 ------
    char *fruits[] = {"苹果", "香蕉", "橙子", "葡萄", "西瓜"};
    int n = sizeof(fruits) / sizeof(fruits[0]);

    printf("指针数组遍历（水果列表）：\n");
    for (int i = 0; i < n; i++) {
        printf("%s ", fruits[i]);  // fruits[i] 是 char*
    }
    printf("\n");

    // 通过指针数组对字符串排序（冒泡排序）
    // 只交换指针，不移动字符串本身
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (strcmp(fruits[j], fruits[j + 1]) > 0) {
                char *temp = fruits[j];
                fruits[j] = fruits[j + 1];
                fruits[j + 1] = temp;
            }
        }
    }

    printf("排序后：\n");
    for (int i = 0; i < n; i++) {
        printf("%s ", fruits[i]);
    }
    printf("\n");

    // ------ 数组指针：指向整个数组的指针 ------
    int arr[5] = {1, 2, 3, 4, 5};
    int (*pArr)[5] = &arr;  // pArr 指向包含 5 个 int 的数组

    printf("\n数组指针访问元素：\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", (*pArr)[i]);  // 通过数组指针访问
    }
    printf("\n");

    // 用数组指针访问二维数组
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    int(*pMatrix)[4] = matrix;  // pMatrix 指向每行 4 个 int 的数组

    printf("\n通过数组指针访问二维数组：\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%4d", pMatrix[i][j]);  // 等价于 matrix[i][j]
        }
        printf("\n");
    }

    // ------ 函数指针 ------
    printf("\n====== 函数指针 ======\n");
    int (*funcPtr)(int, int);  // 声明指向返回 int 有两个 int 参数的函数指针

    funcPtr = add;             // 指向 add 函数（需要 add 函数存在）
    // 为演示，这里定义一个简单的加法函数并调用
    // 见下方内联

    return 0;
}

// 辅助函数（上面的代码中用到）
int add(int a, int b) {
    return a + b;
}
```

**输出：**
```
指针数组遍历（水果列表）：
苹果 香蕉 橙子 葡萄 西瓜
排序后：
西瓜 香蕉 葡萄 橙子 苹果

数组指针访问元素：
1 2 3 4 5

通过数组指针访问二维数组：
   1   2   3   4
   5   6   7   8
   9  10  11  12
```

### 10.3 二级指针

```c
#include <stdio.h>

int main() {
    // 二级指针：指向指针的指针
    int a = 100;
    int *p = &a;      // 一级指针
    int **pp = &p;    // 二级指针，存放 p 的地址

    printf("a = %d\n", a);
    printf("*p = %d\n", *p);        // 通过一级指针访问 a
    printf("**pp = %d\n", **pp);    // 通过二级指针访问 a

    // 二级指针常用于修改指针本身的值
    // 例如在函数中修改传入的指针

    // 二级指针与指针数组
    char *names[] = {"Alice", "Bob", "Charlie"};
    char **ptr = names;  // 指针数组名是二级指针

    printf("\n通过二级指针遍历字符串数组：\n");
    for (int i = 0; i < 3; i++) {
        printf("%s\n", *(ptr + i));  // 或 ptr[i]
    }

    return 0;
}
```

**输出：**
```
a = 100
*p = 100
**pp = 100

通过二级指针遍历字符串数组：
Alice
Bob
Charlie
```

---

## 11. 结构体

### 11.1 结构体定义与使用

```c
#include <stdio.h>
#include <string.h>

// 定义结构体类型
struct Student {
    int id;             // 学号
    char name[20];      // 姓名
    int age;            // 年龄
    float score;        // 成绩
};  // 注意分号！

// typedef 给结构体起别名（考试非常常用）
typedef struct {
    int year;
    int month;
    int day;
} Date;

int main() {
    // ------ 结构体变量的定义与初始化 ------
    struct Student s1 = {1001, "张三", 20, 88.5f};  // 顺序初始化
    struct Student s2 = {.id = 1002, .name = "李四", .age = 21, .score = 92.0f};  // 指定成员初始化

    // 访问结构体成员：使用 . 运算符
    printf("====== 学生信息 ======\n");
    printf("学号：%d\n", s1.id);
    printf("姓名：%s\n", s1.name);
    printf("年龄：%d\n", s1.age);
    printf("成绩：%.1f\n", s1.score);

    // 使用 typedef 后的结构体
    Date today = {2025, 6, 15};
    printf("\n日期：%d年%d月%d日\n", today.year, today.month, today.day);

    // ------ 结构体数组 ------
    struct Student class[3] = {
        {1001, "张三", 20, 88.5f},
        {1002, "李四", 21, 92.0f},
        {1003, "王五", 19, 76.0f}
    };

    int n = sizeof(class) / sizeof(class[0]);

    printf("\n====== 全班学生信息 ======\n");
    for (int i = 0; i < n; i++) {
        printf("学号:%d  姓名:%s  年龄:%d  成绩:%.1f\n",
               class[i].id, class[i].name,
               class[i].age, class[i].score);
    }

    // 计算平均成绩
    float sum = 0;
    for (int i = 0; i < n; i++) {
        sum += class[i].score;
    }
    printf("班级平均分：%.1f\n", sum / n);

    // ------ 结构体成员赋值 ------
    struct Student s3;
    s3.id = 1004;
    strcpy(s3.name, "赵六");  // 字符串需要 strcpy 复制
    s3.age = 22;
    s3.score = 95.0f;

    printf("\n手动赋值的学生：\n");
    printf("学号:%d  姓名:%s  年龄:%d  成绩:%.1f\n",
           s3.id, s3.name, s3.age, s3.score);

    // ------ 结构体之间的赋值 ------
    struct Student s4 = s1;  // 结构体可以直接赋值（逐个成员复制）
    printf("\n结构体复制：\n");
    printf("s4.姓名：%s  s4.成绩：%.1f\n", s4.name, s4.score);

    return 0;
}
```

**输出：**
```
====== 学生信息 ======
学号：1001
姓名：张三
年龄：20
成绩：88.5

日期：2025年6月15日

====== 全班学生信息 ======
学号:1001  姓名:张三  年龄:20  成绩:88.5
学号:1002  姓名:李四  年龄:21  成绩:92.0
学号:1003  姓名:王五  年龄:19  成绩:76.0
班级平均分：85.5

手动赋值的学生：
学号:1004  姓名:赵六  年龄:22  成绩:95.0

结构体复制：
s4.姓名：张三  s4.成绩：88.5
```

### 11.2 结构体指针

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[20];
    int age;
    float score;
} Student;

// 函数：通过结构体指针修改学生信息
void updateScore(Student *p, float newScore) {
    p->score = newScore;       // -> 运算符：通过指针访问成员
}

// 函数：打印学生信息（结构体作为参数——传地址避免复制）
void printStudent(const Student *p) {
    printf("学号:%d  姓名:%s  年龄:%d  成绩:%.1f\n",
           p->id, p->name, p->age, p->score);
}

// 函数：返回结构体
Student createStudent(int id, const char *name, int age, float score) {
    Student s;
    s.id = id;
    strcpy(s.name, name);
    s.age = age;
    s.score = score;
    return s;
}

int main() {
    Student s1 = {1001, "张三", 20, 88.5f};
    Student *p = &s1;  // 结构体指针指向 s1

    // 通过指针访问成员：使用 ->
    printf("通过指针访问：\n");
    printf("姓名：%s, 成绩：%.1f\n", p->name, p->score);
    // 等价于 (*p).name

    // 通过指针修改成员
    updateScore(p, 95.0f);
    printf("修改后成绩：%.1f\n", s1.score);

    // 结构体指针作为函数参数
    printf("\n打印学生信息：\n");
    printStudent(&s1);

    // 结构体数组与指针
    Student class[3] = {
        {1001, "张三", 20, 88.5f},
        {1002, "李四", 21, 92.0f},
        {1003, "王五", 19, 76.0f}
    };

    printf("\n用指针遍历结构体数组：\n");
    for (Student *ptr = class; ptr < class + 3; ptr++) {
        printStudent(ptr);
    }

    // 函数返回结构体
    Student s2 = createStudent(1005, "小七", 23, 89.0f);
    printf("\n函数创建的学生：\n");
    printStudent(&s2);

    // ------ 动态分配结构体 ------
    Student *dynamicS = (Student *)malloc(sizeof(Student));
    if (dynamicS != NULL) {
        dynamicS->id = 2001;
        strcpy(dynamicS->name, "动态分配");
        dynamicS->age = 25;
        dynamicS->score = 90.0f;

        printf("\n动态分配的结构体：\n");
        printStudent(dynamicS);

        free(dynamicS);  // 释放内存
    }

    return 0;
}
```

**输出：**
```
通过指针访问：
姓名：张三, 成绩：88.5
修改后成绩：95.0

打印学生信息：
学号:1001  姓名:张三  年龄:20  成绩:95.0

用指针遍历结构体数组：
学号:1001  姓名:张三  年龄:20  成绩:95.0
学号:1002  姓名:李四  年龄:21  成绩:92.0
学号:1003  姓名:王五  年龄:19  成绩:76.0

函数创建的学生：
学号:1005  姓名:小七  年龄:23  成绩:89.0

动态分配的结构体：
学号:2001  姓名:动态分配  年龄:25  成绩:90.0
```

---

## 12. 文件操作

```c
#include <stdio.h>
#include <stdlib.h>   // exit 函数

int main() {
    FILE *fp;                     // 文件指针
    char filename[] = "student.txt";

    // ------ 1. 写入文件 (fprintf) ------
    fp = fopen(filename, "w");    // "w" 写入模式，文件不存在则创建，存在则清空
    if (fp == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }

    fprintf(fp, "====== 学生成绩表 ======\n");
    fprintf(fp, "学号\t姓名\t成绩\n");
    fprintf(fp, "%d\t%s\t%.1f\n", 1001, "张三", 88.5);
    fprintf(fp, "%d\t%s\t%.1f\n", 1002, "李四", 92.0);
    fprintf(fp, "%d\t%s\t%.1f\n", 1003, "王五", 76.0);

    fclose(fp);                    // 关闭文件
    printf("数据已写入 %s\n", filename);

    // ------ 2. 读取文件 (fscanf) ------
    fp = fopen(filename, "r");     // "r" 只读模式
    if (fp == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }

    char buffer[100];
    printf("\n读取文件内容：\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);      // fgets 保留换行符
    }
    fclose(fp);

    // ------ 3. fputs 写入、fgets 读取 ------
    fp = fopen("data.txt", "w");
    if (fp == NULL) return 1;

    fputs("Hello, World!\n", fp);
    fputs("This is a test.\n", fp);
    fputs("C language file operations.\n", fp);
    fclose(fp);

    printf("\n====== fgets 逐行读取 ======\n");
    fp = fopen("data.txt", "r");
    if (fp == NULL) return 1;

    char line[256];
    while (fgets(line, sizeof(line), fp) != NULL) {
        // 去掉末尾换行符（可选）
        // line[strcspn(line, "\n")] = '\0';
        printf("读取: %s", line);
    }
    fclose(fp);

    // ------ 4. feof 判断文件结束 ------
    printf("\n====== feof 用法 ======\n");
    fp = fopen("data.txt", "r");
    if (fp == NULL) return 1;

    char ch;
    while (1) {
        ch = fgetc(fp);            // 读取一个字符
        if (feof(fp)) {            // 判断是否到达文件末尾
            break;
        }
        putchar(ch);
    }
    fclose(fp);
    printf("\n");

    // ------ 5. 二进制文件读写 ------
    typedef struct {
        int id;
        char name[20];
        float score;
    } Record;

    Record records[] = {
        {1001, "张三", 88.5f},
        {1002, "李四", 92.0f},
        {1003, "王五", 76.0f}
    };

    // 写入二进制文件
    fp = fopen("record.dat", "wb");  // "wb" 二进制写入
    if (fp == NULL) return 1;

    fwrite(records, sizeof(Record), 3, fp);  // 一次性写入整个数组
    fclose(fp);

    // 读取二进制文件
    Record readBack[3];
    fp = fopen("record.dat", "rb");  // "rb" 二进制读取
    if (fp == NULL) return 1;

    fread(readBack, sizeof(Record), 3, fp);
    fclose(fp);

    printf("\n====== 二进制文件读取 ======\n");
    for (int i = 0; i < 3; i++) {
        printf("学号:%d  姓名:%s  成绩:%.1f\n",
               readBack[i].id, readBack[i].name, readBack[i].score);
    }

    // ------ 清理临时文件 ------
    remove("data.txt");
    remove("record.dat");

    return 0;
}
```

**输出：**
```
数据已写入 student.txt

读取文件内容：
====== 学生成绩表 ======
学号    姓名    成绩
1001    张三    88.5
1002    李四    92.0
1003    王五    76.0

====== fgets 逐行读取 ======
读取: Hello, World!
读取: This is a test.
读取: C language file operations.

====== feof 用法 ======
Hello, World!
This is a test.
C language file operations.

====== 二进制文件读取 ======
学号:1001  姓名:张三  成绩:88.5
学号:1002  姓名:李四  成绩:92.0
学号:1003  姓名:王五  成绩:76.0
```

---

## 13. 动态内存分配

```c
#include <stdio.h>
#include <stdlib.h>   // malloc, calloc, free

int main() {
    int n;

    // ------ 1. malloc：分配指定字节的内存 ------
    printf("请输入数组大小：");
    scanf("%d", &n);

    // malloc 返回 void*，需要强制类型转换
    int *arr = (int *)malloc(n * sizeof(int));

    // 检查分配是否成功
    if (arr == NULL) {
        printf("内存分配失败！\n");
        return 1;
    }

    // 使用这块内存
    printf("请输入 %d 个整数：\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);     // 使用数组下标访问
        // 等价于 scanf("%d", arr + i);
    }

    printf("您输入的是：");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 释放内存
    free(arr);
    arr = NULL;  // 避免野指针

    // ------ 2. calloc：分配并初始化为 0 ------
    printf("\n====== calloc 演示 ======\n");
    int *arr2 = (int *)calloc(5, sizeof(int));  // 分配 5 个 int，全部初始化为 0

    if (arr2 == NULL) return 1;

    printf("calloc 分配的值（自动初始化为 0）：");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr2[i]);   // 全部为 0
    }
    printf("\n");

    // 赋值后使用
    for (int i = 0; i < 5; i++) {
        arr2[i] = (i + 1) * 10;
    }
    printf("赋值后：");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr2[i]);
    }
    printf("\n");

    free(arr2);
    arr2 = NULL;

    // ------ 3. realloc：调整内存大小 ------
    printf("\n====== realloc 演示 ======\n");
    int *arr3 = (int *)malloc(3 * sizeof(int));
    if (arr3 == NULL) return 1;

    for (int i = 0; i < 3; i++) {
        arr3[i] = i + 1;
    }

    printf("原数组（容量 3）：");
    for (int i = 0; i < 3; i++) printf("%d ", arr3[i]);
    printf("\n");

    // 扩展为 5 个元素
    int *temp = (int *)realloc(arr3, 5 * sizeof(int));
    if (temp == NULL) {
        free(arr3);
        return 1;
    }
    arr3 = temp;

    // 新元素赋值
    arr3[3] = 4;
    arr3[4] = 5;

    printf("扩容后（容量 5）：");
    for (int i = 0; i < 5; i++) printf("%d ", arr3[i]);
    printf("\n");

    free(arr3);
    arr3 = NULL;

    // ------ 4. 动态二维数组 ------
    printf("\n====== 动态二维数组 ======\n");
    int rows = 3, cols = 4;

    // 分配行指针数组
    int **matrix = (int **)malloc(rows * sizeof(int *));
    if (matrix == NULL) return 1;

    // 为每行分配列空间
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int *)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) return 1;
    }

    // 赋值
    int count = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = count++;
        }
    }

    printf("动态二维数组：\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }

    // 释放：先释放每行，再释放行指针数组
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
    matrix = NULL;

    // ------ 重要提醒 ------
    printf("\n====== 动态内存分配要点 ======\n");
    printf("1. malloc 不初始化内存，calloc 初始化为 0\n");
    printf("2. 分配后必须检查返回值是否为 NULL\n");
    printf("3. 使用后必须 free 释放，避免内存泄漏\n");
    printf("4. free 后应将指针置为 NULL，避免野指针\n");
    printf("5. 内存分配可能失败，务必处理\n");

    return 0;
}
```

**输入/输出：**
```
请输入数组大小：5
请输入 5 个整数：
10 20 30 40 50
您输入的是：10 20 30 40 50

====== calloc 演示 ======
calloc 分配的值（自动初始化为 0）：0 0 0 0 0
赋值后：10 20 30 40 50

====== realloc 演示 ======
原数组（容量 3）：1 2 3
扩容后（容量 5）：1 2 3 4 5

====== 动态二维数组 ======
动态二维数组：
   1   2   3   4
   5   6   7   8
   9  10  11  12

====== 动态内存分配要点 ======
1. malloc 不初始化内存，calloc 初始化为 0
2. 分配后必须检查返回值是否为 NULL
3. 使用后必须 free 释放，避免内存泄漏
4. free 后应将指针置为 NULL，避免野指针
5. 内存分配可能失败，务必处理
```

---

## 14. 预处理指令

```c
#include <stdio.h>

// ------ 1. #define 定义常量 ------
#define PI 3.14159                 // 定义常量
#define MAX_SIZE 100               // 定义数组大小
#define STUDENT_COUNT 50

// ------ 2. #define 定义带参数的宏 ------
#define SQUARE(x) ((x) * (x))      // 注意：参数加括号避免优先级问题
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// 宏可以跨多行（用 \ 续行）
#define SWAP(a, b, type) do { \
    type temp = a; \
    a = b; \
    b = temp; \
} while (0)

// ------ 3. 条件编译 ------
#define DEBUG 1                    // 控制调试开关

// 也可以使用 #ifdef / #ifndef
#define FEATURE_PRINT              // 定义一个宏，表示某功能启用

int main() {
    // 使用常量
    double radius = 5.0;
    double area = PI * radius * radius;
    printf("半径 %.1f 的圆面积 = %.2f\n", radius, area);

    // 使用宏
    int a = 10, b = 20;
    printf("MAX(%d, %d) = %d\n", a, b, MAX(a, b));
    printf("SQUARE(%d) = %d\n", 5, SQUARE(5));

    // 宏的陷阱：不加括号的问题
    printf("SQUARE(2+3) = %d\n", SQUARE(2+3));  // ((2+3)*(2+3)) = 25

    // SWAP 宏
    int x = 100, y = 200;
    printf("\n交换前：x=%d, y=%d\n", x, y);
    SWAP(x, y, int);
    printf("交换后：x=%d, y=%d\n", x, y);

    // ------ 条件编译 ------
    #if DEBUG  // 如果 DEBUG 为真，则编译此段代码
        printf("\n[调试模式] 变量 a = %d, b = %d\n", a, b);
    #endif

    #ifdef FEATURE_PRINT  // 如果定义了 FEATURE_PRINT，则编译
        printf("[功能] 打印功能已启用\n");
    #endif

    #ifndef MAX_SIZE  // 如果没有定义 MAX_SIZE，则定义
        #define MAX_SIZE 100
    #endif
    printf("MAX_SIZE = %d\n", MAX_SIZE);

    // ------ #undef 取消宏定义 ------
    #undef DEBUG
    // 此后 DEBUG 不再被定义

    // 多分支条件编译
    #if defined(DEBUG)
        printf("DEBUG 模式\n");
    #elif defined(FEATURE_PRINT)
        printf("FEATURE_PRINT 模式\n");
    #else
        printf("默认模式\n");
    #endif

    // ------ #pragma 预处理指令 ------
    // 常用但不考：例如 #pragma once（防止头文件重复包含）

    return 0;
}
```

**输出：**
```
半径 5.0 的圆面积 = 78.54
MAX(10, 20) = 20
SQUARE(5) = 25
SQUARE(2+3) = 25

交换前：x=100, y=200
交换后：x=200, y=100

[调试模式] 变量 a = 10, b = 20
[功能] 打印功能已启用
MAX_SIZE = 100
FEATURE_PRINT 模式
```

---

## 15. 顺序表操作

```c
#include <stdio.h>
#include <stdlib.h>

#define MAXSIZE 100  // 顺序表的最大容量

// 定义顺序表结构
typedef struct {
    int data[MAXSIZE];  // 存放元素的数组
    int length;         // 当前长度
} SeqList;

// 初始化顺序表
void initList(SeqList *L) {
    L->length = 0;
}

// 插入操作：在位置 pos 插入元素 value（pos 从 1 开始）
int insert(SeqList *L, int pos, int value) {
    // 检查是否已满
    if (L->length >= MAXSIZE) {
        printf("顺序表已满，无法插入！\n");
        return 0;
    }
    // 检查位置是否合法
    if (pos < 1 || pos > L->length + 1) {
        printf("插入位置不合法！\n");
        return 0;
    }

    // 从最后一个元素开始向后移动，腾出位置
    for (int i = L->length; i >= pos; i--) {
        L->data[i] = L->data[i - 1];
    }

    // 插入新元素
    L->data[pos - 1] = value;
    L->length++;

    return 1;
}

// 删除操作：删除位置 pos 的元素（pos 从 1 开始）
int deleteElem(SeqList *L, int pos) {
    // 检查是否为空
    if (L->length == 0) {
        printf("顺序表为空，无法删除！\n");
        return 0;
    }
    // 检查位置是否合法
    if (pos < 1 || pos > L->length) {
        printf("删除位置不合法！\n");
        return 0;
    }

    // 从 pos 后面开始向前移动覆盖
    for (int i = pos; i < L->length; i++) {
        L->data[i - 1] = L->data[i];
    }

    L->length--;
    return 1;
}

// 按值查找：返回元素第一次出现的位置（从 1 开始），未找到返回 -1
int search(SeqList *L, int value) {
    for (int i = 0; i < L->length; i++) {
        if (L->data[i] == value) {
            return i + 1;  // 返回位置（从 1 开始）
        }
    }
    return -1;  // 未找到
}

// 按位置查找：返回位置 pos 的元素值
int getElem(SeqList *L, int pos) {
    if (pos < 1 || pos > L->length) {
        printf("位置不合法！\n");
        return -1;
    }
    return L->data[pos - 1];
}

// 修改元素
int update(SeqList *L, int pos, int newValue) {
    if (pos < 1 || pos > L->length) {
        printf("位置不合法！\n");
        return 0;
    }
    L->data[pos - 1] = newValue;
    return 1;
}

// 打印顺序表
void printList(SeqList *L) {
    printf("顺序表（长度=%d）：", L->length);
    for (int i = 0; i < L->length; i++) {
        printf("%d ", L->data[i]);
    }
    printf("\n");
}

// 主函数测试
int main() {
    SeqList L;
    initList(&L);

    // 插入测试
    printf("====== 插入操作 ======\n");
    insert(&L, 1, 10);   // 在位置 1 插入 10
    insert(&L, 2, 20);   // 在位置 2 插入 20
    insert(&L, 3, 30);   // 在位置 3 插入 30
    insert(&L, 4, 40);   // 在位置 4 插入 40
    printList(&L);

    // 在中间插入
    insert(&L, 2, 15);   // 在位置 2 插入 15
    printList(&L);

    // 删除测试
    printf("\n====== 删除操作 ======\n");
    deleteElem(&L, 3);   // 删除位置 3 的元素
    printList(&L);

    // 查找测试
    printf("\n====== 查找操作 ======\n");
    int findVal = 30;
    int pos = search(&L, findVal);
    if (pos != -1) {
        printf("元素 %d 在位置 %d\n", findVal, pos);
    } else {
        printf("元素 %d 未找到\n", findVal);
    }

    // 按位置查找
    int elem = getElem(&L, 2);
    printf("位置 2 的元素是：%d\n", elem);

    // 修改测试
    printf("\n====== 修改操作 ======\n");
    update(&L, 1, 100);
    printList(&L);

    // 清空
    printf("\n====== 清空顺序表 ======\n");
    initList(&L);
    printList(&L);

    return 0;
}
```

**输出：**
```
====== 插入操作 ======
顺序表（长度=4）：10 20 30 40
顺序表（长度=5）：10 15 20 30 40

====== 删除操作 ======
顺序表（长度=4）：10 15 30 40

====== 查找操作 ======
元素 30 在位置 3
位置 2 的元素是：15

====== 修改操作 ======
顺序表（长度=4）：100 15 30 40

====== 清空顺序表 ======
顺序表（长度=0）：
```

---

## 16. 单链表操作

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表结点
typedef struct Node {
    int data;            // 数据域
    struct Node *next;   // 指针域，指向下一个结点
} Node, *LinkList;       // LinkList 等价于 Node*

// 头插法创建链表（逆序）
LinkList createByHead(int arr[], int n) {
    LinkList head = (Node *)malloc(sizeof(Node));  // 头结点
    head->next = NULL;                             // 头结点指针域置空

    for (int i = 0; i < n; i++) {
        Node *newNode = (Node *)malloc(sizeof(Node));
        newNode->data = arr[i];

        // 将新结点插入到头结点之后
        newNode->next = head->next;
        head->next = newNode;
    }

    return head;
}

// 尾插法创建链表（正序）
LinkList createByTail(int arr[], int n) {
    LinkList head = (Node *)malloc(sizeof(Node));
    head->next = NULL;
    Node *tail = head;     // 尾指针，指向最后一个结点

    for (int i = 0; i < n; i++) {
        Node *newNode = (Node *)malloc(sizeof(Node));
        newNode->data = arr[i];
        newNode->next = NULL;

        // 将新结点链接到尾部
        tail->next = newNode;
        tail = newNode;     // 更新尾指针
    }

    return head;
}

// 遍历链表
void printList(LinkList head) {
    Node *p = head->next;   // 跳过头结点
    while (p != NULL) {
        printf("%d -> ", p->data);
        p = p->next;
    }
    printf("NULL\n");
}

// 获取链表长度
int length(LinkList head) {
    int count = 0;
    Node *p = head->next;
    while (p != NULL) {
        count++;
        p = p->next;
    }
    return count;
}

// 按位置插入（pos 从 1 开始）
int insertByPos(LinkList head, int pos, int value) {
    // 找到位置 pos-1 的结点
    Node *p = head;
    int j = 0;

    while (p != NULL && j < pos - 1) {
        p = p->next;
        j++;
    }

    if (p == NULL || j > pos - 1) {
        printf("插入位置无效！\n");
        return 0;
    }

    // 创建新结点并插入
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = p->next;
    p->next = newNode;

    return 1;
}

// 按位置删除（pos 从 1 开始）
int deleteByPos(LinkList head, int pos) {
    Node *p = head;
    int j = 0;

    // 找到位置 pos-1 的结点（前驱结点）
    while (p->next != NULL && j < pos - 1) {
        p = p->next;
        j++;
    }

    if (p->next == NULL || j > pos - 1) {
        printf("删除位置无效！\n");
        return 0;
    }

    Node *q = p->next;      // 要删除的结点
    p->next = q->next;      // 从链表中移除
    free(q);                // 释放内存

    return 1;
}

// 按值查找结点，返回结点指针
Node *searchByValue(LinkList head, int value) {
    Node *p = head->next;
    while (p != NULL) {
        if (p->data == value) {
            return p;
        }
        p = p->next;
    }
    return NULL;  // 未找到
}

// 按位置查找
Node *getNodeByPos(LinkList head, int pos) {
    Node *p = head->next;
    int j = 1;

    while (p != NULL && j < pos) {
        p = p->next;
        j++;
    }

    if (p == NULL || j > pos) {
        return NULL;
    }
    return p;
}

// 销毁链表
void destroyList(LinkList head) {
    Node *p = head;
    while (p != NULL) {
        Node *temp = p;
        p = p->next;
        free(temp);
    }
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);

    // 头插法创建
    printf("====== 头插法创建（逆序）======\n");
    LinkList list1 = createByHead(arr, n);
    printList(list1);  // 50 -> 40 -> 30 -> 20 -> 10 -> NULL
    printf("长度：%d\n", length(list1));

    // 尾插法创建
    printf("\n====== 尾插法创建（正序）======\n");
    LinkList list2 = createByTail(arr, n);
    printList(list2);  // 10 -> 20 -> 30 -> 40 -> 50 -> NULL

    // 插入操作
    printf("\n====== 插入操作 ======\n");
    insertByPos(list2, 3, 25);  // 在位置 3 插入 25
    printList(list2);

    // 删除操作
    printf("\n====== 删除操作 ======\n");
    deleteByPos(list2, 4);      // 删除位置 4 的结点
    printList(list2);

    // 查找操作
    printf("\n====== 查找操作 ======\n");
    Node *found = searchByValue(list2, 30);
    if (found != NULL) {
        printf("找到结点：data = %d\n", found->data);
    } else {
        printf("未找到\n");
    }

    Node *node = getNodeByPos(list2, 2);
    if (node != NULL) {
        printf("位置 2 的结点：data = %d\n", node->data);
    }

    // 销毁链表
    destroyList(list1);
    destroyList(list2);

    return 0;
}
```

**输出：**
```
====== 头插法创建（逆序）======
50 -> 40 -> 30 -> 20 -> 10 -> NULL
长度：5

====== 尾插法创建（正序）======
10 -> 20 -> 30 -> 40 -> 50 -> NULL

====== 插入操作 ======
10 -> 20 -> 25 -> 30 -> 40 -> 50 -> NULL

====== 删除操作 ======
10 -> 20 -> 25 -> 40 -> 50 -> NULL

====== 查找操作 ======
找到结点：data = 30
位置 2 的结点：data = 20
```

---

## 17. 栈操作

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAXSIZE 100

// ------ 顺序栈 ------
typedef struct {
    int data[MAXSIZE];  // 存放栈元素
    int top;            // 栈顶指针，top = -1 表示空栈
} SeqStack;

// 初始化栈
void initStack(SeqStack *s) {
    s->top = -1;
}

// 判断栈空
bool isEmpty(SeqStack *s) {
    return s->top == -1;
}

// 判断栈满
bool isFull(SeqStack *s) {
    return s->top == MAXSIZE - 1;
}

// 入栈
bool push(SeqStack *s, int value) {
    if (isFull(s)) {
        printf("栈已满，无法入栈！\n");
        return false;
    }
    s->data[++(s->top)] = value;  // top 先加 1，再赋值
    return true;
}

// 出栈
bool pop(SeqStack *s, int *value) {
    if (isEmpty(s)) {
        printf("栈为空，无法出栈！\n");
        return false;
    }
    *value = s->data[(s->top)--];  // 先取值，top 再减 1
    return true;
}

// 获取栈顶元素（不出栈）
bool getTop(SeqStack *s, int *value) {
    if (isEmpty(s)) {
        return false;
    }
    *value = s->data[s->top];
    return true;
}

// 获取栈中元素个数
int size(SeqStack *s) {
    return s->top + 1;
}

// 打印栈（从栈顶到栈底）
void printStack(SeqStack *s) {
    printf("栈（从顶到底）：");
    for (int i = s->top; i >= 0; i--) {
        printf("%d ", s->data[i]);
    }
    printf("\n");
}

// ------ 栈的应用：括号匹配 ------
bool isMatching(char left, char right) {
    return (left == '(' && right == ')') ||
           (left == '[' && right == ']') ||
           (left == '{' && right == '}');
}

bool checkBrackets(char *expr) {
    // 用顺序栈实现，但不使用上面的 SeqStack（因为存 char）
    // 这里简单演示，用数组模拟
    char stack[MAXSIZE];
    int top = -1;

    for (int i = 0; expr[i] != '\0'; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '[' || ch == '{') {
            stack[++top] = ch;  // 左括号入栈
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (top == -1) return false;  // 栈空，无匹配左括号
            if (!isMatching(stack[top--], ch)) return false;  // 不匹配
        }
    }

    return top == -1;  // 栈空说明完全匹配
}

// ------ 栈的应用：十进制转二进制 ------
void decimalToBinary(int n) {
    SeqStack s;
    initStack(&s);

    if (n == 0) {
        push(&s, 0);
    }

    while (n > 0) {
        push(&s, n % 2);  // 余数入栈
        n /= 2;
    }

    printf("二进制：");
    int value;
    while (!isEmpty(&s)) {
        pop(&s, &value);
        printf("%d", value);
    }
    printf("\n");
}

int main() {
    // 基本栈操作测试
    printf("====== 栈的基本操作 ======\n");
    SeqStack s;
    initStack(&s);

    // 入栈
    printf("入栈：1, 2, 3, 4, 5\n");
    push(&s, 1);
    push(&s, 2);
    push(&s, 3);
    push(&s, 4);
    push(&s, 5);
    printStack(&s);
    printf("栈大小：%d\n", size(&s));

    // 出栈
    int value;
    pop(&s, &value);
    printf("出栈元素：%d\n", value);
    printStack(&s);

    // 获取栈顶
    getTop(&s, &value);
    printf("栈顶元素：%d\n", value);

    // 连续出栈
    printf("\n连续出栈：");
    while (!isEmpty(&s)) {
        pop(&s, &value);
        printf("%d ", value);
    }
    printf("\n");

    // 括号匹配
    printf("\n====== 括号匹配 ======\n");
    char *expr1 = "({[]})";
    char *expr2 = "({[)})";
    printf("表达式 \"%s\"：%s\n", expr1,
           checkBrackets(expr1) ? "匹配" : "不匹配");
    printf("表达式 \"%s\"：%s\n", expr2,
           checkBrackets(expr2) ? "匹配" : "不匹配");

    // 十进制转二进制
    printf("\n====== 十进制转二进制 ======\n");
    for (int n = 0; n <= 10; n++) {
        printf("%d → ", n);
        decimalToBinary(n);
    }

    return 0;
}
```

**输出：**
```
====== 栈的基本操作 ======
入栈：1, 2, 3, 4, 5
栈（从顶到底）：5 4 3 2 1
栈大小：5
出栈元素：5
栈（从顶到底）：4 3 2 1
栈顶元素：4

连续出栈：4 3 2 1

====== 括号匹配 ======
表达式 "({[]})"：匹配
表达式 "({[)})"：不匹配

====== 十进制转二进制 ======
0 → 二进制：0
1 → 二进制：1
2 → 二进制：10
3 → 二进制：11
4 → 二进制：100
5 → 二进制：101
6 → 二进制：110
7 → 二进制：111
8 → 二进制：1000
9 → 二进制：1001
10 → 二进制：1010
```

---

## 18. 队列操作

### 18.1 顺序队列（循环队列）

```c
#include <stdio.h>
#include <stdbool.h>

#define MAXSIZE 6  // 循环队列实际可用 MAXSIZE-1 个元素

// 循环队列结构
typedef struct {
    int data[MAXSIZE];
    int front;  // 队头指针，指向队头元素
    int rear;   // 队尾指针，指向队尾元素的下一个位置
} CircularQueue;

// 初始化队列
void initQueue(CircularQueue *q) {
    q->front = 0;
    q->rear = 0;
}

// 判断队列是否为空
bool isEmpty(CircularQueue *q) {
    return q->front == q->rear;
}

// 判断队列是否已满
bool isFull(CircularQueue *q) {
    return (q->rear + 1) % MAXSIZE == q->front;
}

// 入队
bool enQueue(CircularQueue *q, int value) {
    if (isFull(q)) {
        printf("队列已满！\n");
        return false;
    }
    q->data[q->rear] = value;
    q->rear = (q->rear + 1) % MAXSIZE;  // 循环移动
    return true;
}

// 出队
bool deQueue(CircularQueue *q, int *value) {
    if (isEmpty(q)) {
        printf("队列为空！\n");
        return false;
    }
    *value = q->data[q->front];
    q->front = (q->front + 1) % MAXSIZE;  // 循环移动
    return true;
}

// 获取队头元素
bool getFront(CircularQueue *q, int *value) {
    if (isEmpty(q)) {
        return false;
    }
    *value = q->data[q->front];
    return true;
}

// 获取队列长度
int queueLength(CircularQueue *q) {
    return (q->rear - q->front + MAXSIZE) % MAXSIZE;
}

// 打印队列
void printQueue(CircularQueue *q) {
    printf("队列（从队头到队尾，长度=%d）：", queueLength(q));
    int i = q->front;
    while (i != q->rear) {
        printf("%d ", q->data[i]);
        i = (i + 1) % MAXSIZE;
    }
    printf("\n");
}

int main() {
    CircularQueue q;
    initQueue(&q);

    // 入队
    printf("====== 循环队列操作 ======\n");
    printf("入队：10, 20, 30, 40, 50\n");
    enQueue(&q, 10);
    enQueue(&q, 20);
    enQueue(&q, 30);
    enQueue(&q, 40);
    enQueue(&q, 50);
    printQueue(&q);

    // 出队
    int value;
    deQueue(&q, &value);
    printf("出队元素：%d\n", value);
    deQueue(&q, &value);
    printf("出队元素：%d\n", value);
    printQueue(&q);

    // 入队新元素
    printf("入队：60, 70\n");
    enQueue(&q, 60);
    enQueue(&q, 70);
    printQueue(&q);

    // 查看队头
    getFront(&q, &value);
    printf("队头元素：%d\n", value);

    // 连续出队直到空
    printf("\n连续出队：");
    while (!isEmpty(&q)) {
        deQueue(&q, &value);
        printf("%d ", value);
    }
    printf("\n");

    // 空队测试
    printf("\n空队测试：\n");
    if (isEmpty(&q)) {
        printf("队列为空\n");
    }

    return 0;
}
```

**输出：**
```
====== 循环队列操作 ======
入队：10, 20, 30, 40, 50
队列（从队头到队尾，长度=5）：10 20 30 40 50
出队元素：10
出队元素：20
队列（从队头到队尾，长度=3）：30 40 50
入队：60, 70
队列（从队头到队尾，长度=5）：30 40 50 60 70
队头元素：30

连续出队：30 40 50 60 70

空队测试：
队列为空
```

### 18.2 链队列

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 链队列结点
typedef struct QNode {
    int data;
    struct QNode *next;
} QNode;

// 链队列结构
typedef struct {
    QNode *front;  // 队头指针
    QNode *rear;   // 队尾指针
} LinkQueue;

// 初始化队列
void initQueue(LinkQueue *q) {
    q->front = q->rear = (QNode *)malloc(sizeof(QNode));
    q->front->next = NULL;
}

// 判断队列是否为空
bool isEmpty(LinkQueue *q) {
    return q->front == q->rear;
}

// 入队（尾插法）
void enQueue(LinkQueue *q, int value) {
    QNode *newNode = (QNode *)malloc(sizeof(QNode));
    newNode->data = value;
    newNode->next = NULL;

    q->rear->next = newNode;  // 链接到队尾
    q->rear = newNode;        // 更新队尾指针
}

// 出队（头删法）
bool deQueue(LinkQueue *q, int *value) {
    if (isEmpty(q)) {
        printf("队列为空！\n");
        return false;
    }

    QNode *temp = q->front->next;  // 要删除的队头结点
    *value = temp->data;
    q->front->next = temp->next;   // 跳过该结点

    // 如果队列中只有一个元素，删除后队尾也要指向头结点
    if (q->rear == temp) {
        q->rear = q->front;
    }

    free(temp);
    return true;
}

// 打印队列
void printQueue(LinkQueue *q) {
    printf("队列：");
    QNode *p = q->front->next;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\n");
}

// 销毁队列
void destroyQueue(LinkQueue *q) {
    while (q->front != NULL) {
        q->rear = q->front->next;
        free(q->front);
        q->front = q->rear;
    }
}

int main() {
    LinkQueue q;
    initQueue(&q);

    printf("====== 链队列操作 ======\n");
    printf("入队：10, 20, 30, 40, 50\n");
    enQueue(&q, 10);
    enQueue(&q, 20);
    enQueue(&q, 30);
    enQueue(&q, 40);
    enQueue(&q, 50);
    printQueue(&q);

    int value;
    deQueue(&q, &value);
    printf("出队：%d\n", value);
    deQueue(&q, &value);
    printf("出队：%d\n", value);
    printQueue(&q);

    enQueue(&q, 60);
    enQueue(&q, 70);
    printf("入队 60, 70 后：\n");
    printQueue(&q);

    printf("\n连续出队：");
    while (!isEmpty(&q)) {
        deQueue(&q, &value);
        printf("%d ", value);
    }
    printf("\n");

    destroyQueue(&q);
    return 0;
}
```

**输出：**
```
====== 链队列操作 ======
入队：10, 20, 30, 40, 50
队列：10 20 30 40 50
出队：10
出队：20
队列：30 40 50
入队 60, 70 后：
队列：30 40 50 60 70

连续出队：30 40 50 60 70
```

---

## 19. 二叉树遍历

```c
#include <stdio.h>
#include <stdlib.h>

// 二叉树结点结构
typedef struct TreeNode {
    char data;                   // 数据域
    struct TreeNode *left;       // 左孩子指针
    struct TreeNode *right;      // 右孩子指针
} TreeNode;

// 创建一个新结点
TreeNode *createNode(char data) {
    TreeNode *node = (TreeNode *)malloc(sizeof(TreeNode));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 构建一棵二叉树（手动创建）
//           A
//         /   \
//        B     C
//       / \   / \
//      D   E F   G
TreeNode *createSampleTree() {
    TreeNode *A = createNode('A');
    TreeNode *B = createNode('B');
    TreeNode *C = createNode('C');
    TreeNode *D = createNode('D');
    TreeNode *E = createNode('E');
    TreeNode *F = createNode('F');
    TreeNode *G = createNode('G');

    A->left = B;
    A->right = C;
    B->left = D;
    B->right = E;
    C->left = F;
    C->right = G;

    return A;
}

// ------ 先序遍历（根左右）------
void preOrder(TreeNode *root) {
    if (root == NULL) {
        return;
    }
    printf("%c ", root->data);     // 先访问根
    preOrder(root->left);          // 再遍历左子树
    preOrder(root->right);         // 最后遍历右子树
}

// ------ 中序遍历（左根右）------
void inOrder(TreeNode *root) {
    if (root == NULL) {
        return;
    }
    inOrder(root->left);           // 先遍历左子树
    printf("%c ", root->data);     // 再访问根
    inOrder(root->right);          // 最后遍历右子树
}

// ------ 后序遍历（左右根）------
void postOrder(TreeNode *root) {
    if (root == NULL) {
        return;
    }
    postOrder(root->left);         // 先遍历左子树
    postOrder(root->right);        // 再遍历右子树
    printf("%c ", root->data);     // 最后访问根
}

// ------ 计算二叉树结点个数 ------
int countNodes(TreeNode *root) {
    if (root == NULL) {
        return 0;
    }
    return 1 + countNodes(root->left) + countNodes(root->right);
}

// ------ 计算二叉树深度 ------
int depth(TreeNode *root) {
    if (root == NULL) {
        return 0;
    }
    int leftDepth = depth(root->left);
    int rightDepth = depth(root->right);
    return (leftDepth > rightDepth ? leftDepth : rightDepth) + 1;
}

// ------ 计算叶子结点个数 ------
int countLeaves(TreeNode *root) {
    if (root == NULL) {
        return 0;
    }
    // 左右子树都为空，说明是叶子结点
    if (root->left == NULL && root->right == NULL) {
        return 1;
    }
    return countLeaves(root->left) + countLeaves(root->right);
}

// ------ 层序遍历（广度优先，需要队列辅助）------
void levelOrder(TreeNode *root) {
    if (root == NULL) return;

    // 用数组模拟简单队列
    TreeNode *queue[100];
    int front = 0, rear = 0;

    queue[rear++] = root;  // 根结点入队

    while (front < rear) {
        TreeNode *node = queue[front++];  // 出队
        printf("%c ", node->data);

        if (node->left != NULL) {
            queue[rear++] = node->left;   // 左孩子入队
        }
        if (node->right != NULL) {
            queue[rear++] = node->right;  // 右孩子入队
        }
    }
}

// 释放二叉树
void freeTree(TreeNode *root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main() {
    TreeNode *root = createSampleTree();

    printf("====== 二叉树遍历 ======\n");
    printf("树结构：\n");
    printf("           A\n");
    printf("         /   \\\n");
    printf("        B     C\n");
    printf("       / \\   / \\\n");
    printf("      D   E F   G\n\n");

    printf("先序遍历（根左右）：");
    preOrder(root);
    printf("\n");

    printf("中序遍历（左根右）：");
    inOrder(root);
    printf("\n");

    printf("后序遍历（左右根）：");
    postOrder(root);
    printf("\n");

    printf("层序遍历：");
    levelOrder(root);
    printf("\n");

    printf("\n====== 二叉树属性 ======\n");
    printf("结点个数：%d\n", countNodes(root));
    printf("树深度：%d\n", depth(root));
    printf("叶子结点个数：%d\n", countLeaves(root));

    freeTree(root);
    return 0;
}
```

**输出：**
```
====== 二叉树遍历 ======
树结构：
           A
         /   \
        B     C
       / \   / \
      D   E F   G

先序遍历（根左右）：A B D E C F G
中序遍历（左根右）：D B E A F C G
后序遍历（左右根）：D E B F G C A
层序遍历：A B C D E F G

====== 二叉树属性 ======
结点个数：7
树深度：3
叶子结点个数：4
```

---

## 20. 冒泡排序选择排序插入排序

### 20.1 冒泡排序

```c
#include <stdio.h>

// 冒泡排序（升序）
void bubbleSort(int arr[], int n) {
    // 外层循环：n-1 趟
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;  // 标志位，记录本趟是否发生交换

        // 内层循环：每趟比较相邻元素，将最大值"冒泡"到最后
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {  // 相邻元素比较
                // 交换
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }

        // 如果本趟没有交换，说明已经有序，提前结束
        if (!swapped) {
            break;
        }

        // 打印每趟结果
        printf("第 %d 趟：", i + 1);
        for (int k = 0; k < n; k++) {
            printf("%d ", arr[k]);
        }
        printf("\n");
    }
}

int main() {
    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("原数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    bubbleSort(arr, n);

    printf("\n排序结果：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
```

**输出：**
```
原数组：5 3 8 6 2 7 1 4

第 1 趟：3 5 6 2 7 1 4 8
第 2 趟：3 5 2 6 1 4 7 8
第 3 趟：3 2 5 1 4 6 7 8
第 4 趟：2 3 1 4 5 6 7 8
第 5 趟：2 1 3 4 5 6 7 8
第 6 趟：1 2 3 4 5 6 7 8

排序结果：1 2 3 4 5 6 7 8
```

### 20.2 选择排序

```c
#include <stdio.h>

// 简单选择排序（升序）
void selectSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;  // 假设当前位置是最小值的位置

        // 在未排序部分中找最小值
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;  // 更新最小值位置
            }
        }

        // 如果最小值不在当前位置，则交换
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }

        // 打印每趟结果
        printf("第 %d 趟：", i + 1);
        for (int k = 0; k < n; k++) {
            printf("%d ", arr[k]);
        }
        printf("\n");
    }
}

int main() {
    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("原数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    selectSort(arr, n);

    printf("\n排序结果：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
```

**输出：**
```
原数组：5 3 8 6 2 7 1 4

第 1 趟：1 3 8 6 2 7 5 4
第 2 趟：1 2 8 6 3 7 5 4
第 3 趟：1 2 3 6 8 7 5 4
第 4 趟：1 2 3 4 8 7 5 6
第 5 趟：1 2 3 4 5 7 8 6
第 6 趟：1 2 3 4 5 6 8 7
第 7 趟：1 2 3 4 5 6 7 8

排序结果：1 2 3 4 5 6 7 8
```

### 20.3 插入排序

```c
#include <stdio.h>

// 直接插入排序（升序）
void insertSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];      // 当前要插入的元素
        int j = i - 1;         // 已排序部分的最后一个位置

        // 在已排序部分从后往前找插入位置
        // 将比 key 大的元素往后移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;  // 插入到正确位置

        // 打印每趟结果
        printf("第 %d 趟：", i);
        for (int k = 0; k < n; k++) {
            printf("%d ", arr[k]);
        }
        printf("\n");
    }
}

int main() {
    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("原数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    insertSort(arr, n);

    printf("\n排序结果：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
```

**输出：**
```
原数组：5 3 8 6 2 7 1 4

第 1 趟：3 5 8 6 2 7 1 4
第 2 趟：3 5 8 6 2 7 1 4
第 3 趟：3 5 6 8 2 7 1 4
第 4 趟：2 3 5 6 8 7 1 4
第 5 趟：2 3 5 6 7 8 1 4
第 6 趟：1 2 3 5 6 7 8 4
第 7 趟：1 2 3 4 5 6 7 8

排序结果：1 2 3 4 5 6 7 8
```

---

## 21. 顺序查找折半查找

### 21.1 顺序查找

```c
#include <stdio.h>

// 顺序查找（无序数组）
int seqSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;  // 返回下标（从 0 开始）
        }
    }
    return -1;  // 未找到
}

// 顺序查找（带哨兵）：从下标 1 开始存储，下标 0 作为哨兵
int seqSearchWithSentinel(int arr[], int n, int key) {
    arr[0] = key;  // 设置哨兵
    int i = n;
    while (arr[i] != key) {
        i--;
    }
    return i;  // 返回 0 表示未找到
}

int main() {
    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    printf("====== 顺序查找 ======\n");

    // 查找存在的元素
    int key1 = 7;
    int pos1 = seqSearch(arr, n, key1);
    if (pos1 != -1) {
        printf("元素 %d 在下标 %d 处\n", key1, pos1);
    } else {
        printf("元素 %d 未找到\n", key1);
    }

    // 查找不存在的元素
    int key2 = 10;
    int pos2 = seqSearch(arr, n, key2);
    if (pos2 != -1) {
        printf("元素 %d 在下标 %d 处\n", key2, pos2);
    } else {
        printf("元素 %d 未找到\n", key2);
    }

    // 查找所有匹配的位置
    int arr2[] = {3, 7, 3, 1, 3, 9, 3, 5};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    int key3 = 3;

    printf("\n在数组 [");
    for (int i = 0; i < n2; i++) printf("%d ", arr2[i]);
    printf("] 中查找 %d：\n", key3);

    printf("所有出现位置：");
    int found = 0;
    for (int i = 0; i < n2; i++) {
        if (arr2[i] == key3) {
            printf("%d ", i + 1);  // 输出位置（从 1 开始）
            found = 1;
        }
    }
    if (!found) {
        printf("未找到");
    }
    printf("\n");

    return 0;
}
```

**输出：**
```
数组：5 3 8 6 2 7 1 4

====== 顺序查找 ======
元素 7 在下标 5 处
元素 10 未找到

在数组 [3 7 3 1 3 9 3 5 ] 中查找 3：
所有出现位置：1 3 5 7
```

### 21.2 折半查找（二分查找）

```c
#include <stdio.h>

// 折半查找（数组必须有序）
int binarySearch(int arr[], int n, int key) {
    int left = 0;          // 左边界
    int right = n - 1;     // 右边界

    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止溢出

        printf("  查找区间 [%d, %d], mid = %d, arr[%d] = %d\n",
               left, right, mid, mid, arr[mid]);

        if (arr[mid] == key) {
            return mid;     // 找到，返回下标
        } else if (arr[mid] < key) {
            left = mid + 1; // 在右半部分继续查找
        } else {
            right = mid - 1; // 在左半部分继续查找
        }
    }

    return -1;  // 未找到
}

// 递归版本
int binarySearchRecursive(int arr[], int left, int right, int key) {
    if (left > right) {
        return -1;  // 查找失败
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == key) {
        return mid;
    } else if (arr[mid] < key) {
        return binarySearchRecursive(arr, mid + 1, right, key);
    } else {
        return binarySearchRecursive(arr, left, mid - 1, key);
    }
}

int main() {
    // 折半查找要求数组有序（升序）
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("有序数组：");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    printf("====== 折半查找 ======\n");

    // 查找存在的元素
    int key1 = 7;
    printf("查找元素 %d：\n", key1);
    int pos1 = binarySearch(arr, n, key1);
    if (pos1 != -1) {
        printf("结果：元素 %d 在下标 %d 处\n\n", key1, pos1);
    } else {
        printf("结果：未找到\n\n");
    }

    // 查找不存在的元素
    int key2 = 11;
    printf("查找元素 %d：\n", key2);
    int pos2 = binarySearch(arr, n, key2);
    if (pos2 != -1) {
        printf("结果：元素 %d 在下标 %d 处\n\n", key2, pos2);
    } else {
        printf("结果：元素 %d 未找到\n\n", key2);
    }

    // 递归版本
    int key3 = 4;
    int pos3 = binarySearchRecursive(arr, 0, n - 1, key3);
    printf("递归版本：元素 %d 在下标 %d 处\n", key3, pos3);

    // 查找边界情况
    printf("\n====== 边界测试 ======\n");
    printf("查找 1 号元素：%d\n", binarySearch(arr, n, 1));
    printf("查找 10 号元素：%d\n", binarySearch(arr, n, 10));

    return 0;
}
```

**输出：**
```
有序数组：1 2 3 4 5 6 7 8 9 10

====== 折半查找 ======
查找元素 7：
  查找区间 [0, 9], mid = 4, arr[4] = 5
  查找区间 [5, 9], mid = 7, arr[7] = 8
  查找区间 [5, 6], mid = 5, arr[5] = 6
  查找区间 [6, 6], mid = 6, arr[6] = 7
结果：元素 7 在下标 6 处

查找元素 11：
  查找区间 [0, 9], mid = 4, arr[4] = 5
  查找区间 [5, 9], mid = 7, arr[7] = 8
  查找区间 [8, 9], mid = 8, arr[8] = 9
  查找区间 [9, 9], mid = 9, arr[9] = 10
  查找区间 [10, 9], 结束
结果：元素 11 未找到

递归版本：元素 4 在下标 3 处

====== 边界测试 ======
查找 1 号元素：0
查找 10 号元素：9
```

---

## 附录：考试常见知识点速查

### 格式控制符速查

| 格式符 | 说明                | 示例               |
|--------|---------------------|--------------------|
| `%d`   | 有符号十进制整数    | `printf("%d", 10)` |
| `%u`   | 无符号十进制整数    | `printf("%u", 10)` |
| `%f`   | 浮点数（float）     | `printf("%.2f", 3.14)` |
| `%lf`  | 双精度浮点数(double)| `printf("%lf", 3.14)` |
| `%c`   | 字符                | `printf("%c", 'A')` |
| `%s`   | 字符串              | `printf("%s", "Hello")` |
| `%p`   | 指针（地址）        | `printf("%p", &a)` |
| `%x`   | 十六进制（小写）    | `printf("%x", 255)` |
| `%o`   | 八进制              | `printf("%o", 8)` |
| `%zu`  | sizeof 返回值       | `printf("%zu", sizeof(int))` |

### 运算符优先级（从高到低）

| 优先级 | 运算符                         | 结合性 |
|--------|--------------------------------|--------|
| 1      | `()` `[]` `->` `.`             | 左→右  |
| 2      | `!` `~` `++` `--` `+` `-` `*` `&` `(类型)` `sizeof` | 右→左  |
| 3      | `*` `/` `%`                    | 左→右  |
| 4      | `+` `-`                        | 左→右  |
| 5      | `<<` `>>`                      | 左→右  |
| 6      | `<` `<=` `>` `>=`              | 左→右  |
| 7      | `==` `!=`                      | 左→右  |
| 8      | `&`                            | 左→右  |
| 9      | `^`                            | 左→右  |
| 10     | `|`                            | 左→右  |
| 11     | `&&`                           | 左→右  |
| 12     | `||`                           | 左→右  |
| 13     | `?:`（条件运算符）             | 右→左  |
| 14     | `=` `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `&=` `^=` `|=` | 右→左  |
| 15     | `,`（逗号运算符）              | 左→右  |

### 常用字符串函数

| 函数 | 原型 | 说明 |
|------|------|------|
| `strlen` | `size_t strlen(const char *s)` | 返回字符串长度（不含 `\0`） |
| `strcpy` | `char *strcpy(char *dest, const char *src)` | 将 src 复制到 dest |
| `strcat` | `char *strcat(char *dest, const char *src)` | 将 src 拼接到 dest 末尾 |
| `strcmp` | `int strcmp(const char *s1, const char *s2)` | 比较 s1 和 s2（字典序） |
| `strncpy` | `char *strncpy(char *dest, const char *src, size_t n)` | 复制最多 n 个字符 |
| `strstr` | `char *strstr(const char *haystack, const char *needle)` | 在 haystack 中查找 needle |

### 时间复杂度速查

| 算法 | 最好 | 平均 | 最坏 | 空间 |
|------|------|------|------|------|
| 冒泡排序 | O(n) | O(n²) | O(n²) | O(1) |
| 简单选择排序 | O(n²) | O(n²) | O(n²) | O(1) |
| 直接插入排序 | O(n) | O(n²) | O(n²) | O(1) |
| 折半查找 | O(1) | O(log n) | O(log n) | O(1) |
| 顺序查找 | O(1) | O(n) | O(n) | O(1) |

---

> **祝各位同学 广东专升本 顺利上岸！** 🎉