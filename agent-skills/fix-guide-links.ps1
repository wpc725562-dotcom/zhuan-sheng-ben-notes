# 此脚本由 AI 指挥官自动生成
# 修复 docs/ 下所有失效的 Obsidian wiki 双链，替换为 VitePress 路由链接
# 使用: pwsh -File fix-guide-links.ps1

$repoRoot = "C:\Users\Administrator\Desktop\deeepseek\zhuan-sheng-ben-notes"

# ============================================================
# 精确替换映射表
# 来源文件 → 旧文本 → 新文本
# 注意：VitePress 使用 cleanUrls，链接不加 .md
# 没有 | 显示文字的 [[X]] 直接用 X 作为显示文字
# ============================================================

$replacements = @(

# ─── docs/guide/2026考纲全解.md ───
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[历年真题/计算机程序设计/2026|2026 真题复盘]]"
    New = "[2026 真题复盘](/posts/computer/2026)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[计算机专业-报考指南]]"
    New = "[计算机专业-报考指南](/guide/计算机专业-报考指南)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[零基础学习路线]]"
    New = "[零基础学习路线](/guide/零基础学习路线)"
}
# 2026考纲全解.md 表格中的计算机笔记链接 (20处)
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.1 C语言概述与基本概念]]"
    New = "[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.2 数据的存储与运算]]"
    New = "[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.3 顺序程序设计]]"
    New = "[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.4 选择结构程序设计]]"
    New = "[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.5 循环结构程序设计]]"
    New = "[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.6 数组]]"
    New = "[1.6 数组](/posts/computer/notes/1.6-数组)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.7 函数]]"
    New = "[1.7 函数](/posts/computer/notes/1.7-函数)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.8 指针]]"
    New = "[1.8 指针](/posts/computer/notes/1.8-指针)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.9 结构体与共用体]]"
    New = "[1.9 结构体与共用体](/posts/computer/notes/1.9-结构体与共用体)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.10 文件操作]]"
    New = "[1.10 文件操作](/posts/computer/notes/1.10-文件操作)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[1.11 程序运行环境与调试]]"
    New = "[1.11 程序运行环境与调试](/posts/computer/notes/1.11-程序运行环境与调试)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.1 数据结构基本概念]]"
    New = "[2.1 数据结构基本概念](/posts/computer/notes/2.1-数据结构基本概念)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.2 线性表]]"
    New = "[2.2 线性表](/posts/computer/notes/2.2-线性表)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.3 栈和队列]]"
    New = "[2.3 栈和队列](/posts/computer/notes/2.3-栈和队列)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.4 串、数组和广义表]]"
    New = "[2.4 串、数组和广义表](/posts/computer/notes/2.4-串、数组和广义表)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.5 树和二叉树]]"
    New = "[2.5 树和二叉树](/posts/computer/notes/2.5-树和二叉树)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.6 图]]"
    New = "[2.6 图](/posts/computer/notes/2.6-图)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.7 查找]]"
    New = "[2.7 查找](/posts/computer/notes/2.7-查找)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.8 排序]]"
    New = "[2.8 排序](/posts/computer/notes/2.8-排序)"
}
@{
    File = "docs/guide/2026考纲全解.md"
    Old = "[[2.9 算法基本概念与分析]]"
    New = "[2.9 算法基本概念与分析](/posts/computer/notes/2.9-算法基本概念与分析)"
}

# ─── docs/guide/公办院校与录取.md ───
@{
    File = "docs/guide/公办院校与录取.md"
    Old = "[[省控线-录取分数线]]"
    New = "[省控线-录取分数线](/guide/省控线-录取分数线)"
}
@{
    File = "docs/guide/公办院校与录取.md"
    Old = "[[省控线-录取分数线|省控线]]"
    New = "[省控线](/guide/省控线-录取分数线)"
}
@{
    File = "docs/guide/公办院校与录取.md"
    Old = "[[政治理论/16-时事政治备考|时事备考]]"
    New = "[时事备考](/posts/politics/notes/16-时事政治备考)"
}
@{
    File = "docs/guide/公办院校与录取.md"
    Old = "[[历年真题/总索引|真题总索引]]"
    New = "真题总索引（源库文件，站点未发布版）"
}

# ─── docs/guide/省控线-录取分数线.md ───
@{
    File = "docs/guide/省控线-录取分数线.md"
    Old = "[[公办院校与录取]]"
    New = "[公办院校与录取](/guide/公办院校与录取)"
}
@{
    File = "docs/guide/省控线-录取分数线.md"
    Old = "[[政治理论/16-时事政治备考|时事备考]]"
    New = "[时事备考](/posts/politics/notes/16-时事政治备考)"
}
@{
    File = "docs/guide/省控线-录取分数线.md"
    Old = "[[历年真题/总索引|真题总索引]]"
    New = "真题总索引（源库文件，站点未发布版）"
}

# ─── docs/guide/计算机专业-报考指南.md ───
@{
    File = "docs/guide/计算机专业-报考指南.md"
    Old = "[[省控线-录取分数线|省控线]]"
    New = "[省控线](/guide/省控线-录取分数线)"
}
@{
    File = "docs/guide/计算机专业-报考指南.md"
    Old = "[[公办院校与录取|公办院校]]"
    New = "[公办院校](/guide/公办院校与录取)"
}
@{
    File = "docs/guide/计算机专业-报考指南.md"
    Old = "[[历年真题/00-资料来源与使用说明|资料来源与使用说明]]"
    New = "[资料来源与使用说明](/guide/sources)"
}
@{
    File = "docs/guide/计算机专业-报考指南.md"
    Old = "[[历年真题/总索引|真题总索引]]"
    New = "真题总索引（源库文件，站点未发布版）"
}

# ─── docs/guide/ B站学习资源库.md ───
@{
    File = "docs/guide/B站学习资源库.md"
    Old = "[[资料/学习资源大全|📚 学习资源大全]]"
    New = "📚 学习资源大全（源库文件，站点未发布版）"
}

# ─── docs/guide/video-ka-map.md ───
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.1 C语言概述与基本概念]]"
    New = "[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.2 数据的存储与运算]]"
    New = "[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.3 顺序程序设计]]"
    New = "[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.4 选择结构程序设计]]"
    New = "[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.5 循环结构程序设计]]"
    New = "[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.6 数组]]"
    New = "[1.6 数组](/posts/computer/notes/1.6-数组)"
}
@{
    File = "docs/guide/video-ka-map.md"
    Old = "[[1.7 函数]]"
    New = "[1.7 函数](/posts/computer/notes/1.7-函数)"
}

# ─── docs/posts/computer/notes/syllabus.md ───
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.1 C语言概述与基本概念]]"
    New = "[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.2 数据的存储与运算]]"
    New = "[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.3 顺序程序设计]]"
    New = "[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.4 选择结构程序设计]]"
    New = "[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.5 循环结构程序设计]]"
    New = "[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.6 数组]]"
    New = "[1.6 数组](/posts/computer/notes/1.6-数组)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.7 函数]]"
    New = "[1.7 函数](/posts/computer/notes/1.7-函数)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.8 指针]]"
    New = "[1.8 指针](/posts/computer/notes/1.8-指针)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.9 结构体与共用体]]"
    New = "[1.9 结构体与共用体](/posts/computer/notes/1.9-结构体与共用体)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.10 文件操作]]"
    New = "[1.10 文件操作](/posts/computer/notes/1.10-文件操作)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[1.11 程序运行环境与调试]]"
    New = "[1.11 程序运行环境与调试](/posts/computer/notes/1.11-程序运行环境与调试)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.1 数据结构基本概念]]"
    New = "[2.1 数据结构基本概念](/posts/computer/notes/2.1-数据结构基本概念)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.2 线性表]]"
    New = "[2.2 线性表](/posts/computer/notes/2.2-线性表)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.3 栈和队列]]"
    New = "[2.3 栈和队列](/posts/computer/notes/2.3-栈和队列)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.4 串、数组和广义表]]"
    New = "[2.4 串、数组和广义表](/posts/computer/notes/2.4-串、数组和广义表)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.5 树和二叉树]]"
    New = "[2.5 树和二叉树](/posts/computer/notes/2.5-树和二叉树)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.6 图]]"
    New = "[2.6 图](/posts/computer/notes/2.6-图)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.7 查找]]"
    New = "[2.7 查找](/posts/computer/notes/2.7-查找)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.8 排序]]"
    New = "[2.8 排序](/posts/computer/notes/2.8-排序)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[2.9 算法基本概念与分析]]"
    New = "[2.9 算法基本概念与分析](/posts/computer/notes/2.9-算法基本概念与分析)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[历年真题/计算机程序设计/2024|2024 全卷]]"
    New = "[2024 全卷](/posts/computer/2024)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[历年真题/计算机程序设计/考点拆分/_索引|考点拆分]]"
    New = "[考点拆分](/posts/computer/topics/)"
}
@{
    File = "docs/posts/computer/notes/syllabus.md"
    Old = "[[计算机程序设计]]"
    New = "计算机程序设计（源库文件，站点未发布版）"
}

# ─── docs/posts/math/notes/syllabus.md ───
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第一章 函数与极限]]"
    New = "第一章 函数与极限（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第二章 一元函数微分学]]"
    New = "第二章 一元函数微分学（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第三章 一元函数积分学]]"
    New = "第三章 一元函数积分学（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第四章 向量与空间几何]]"
    New = "第四章 向量与空间几何（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第五章 多元函数]]"
    New = "第五章 多元函数（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第六章 重积分与曲线积分]]"
    New = "第六章 重积分与曲线积分（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第七章 常微分方程]]"
    New = "第七章 常微分方程（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[第八章 无穷级数]]"
    New = "第八章 无穷级数（笔记见 /posts/math/notes/）"
}
@{
    File = "docs/posts/math/notes/syllabus.md"
    Old = "[[高等数学]]"
    New = "高等数学（笔记见 /posts/math/notes/）"
}

)

# ============================================================
# 执行替换
# ============================================================
$totalReplaced = 0
$filesModified = @{}

foreach ($r in $replacements) {
    $fullPath = Join-Path $repoRoot $r.File
    if (!(Test-Path $fullPath)) {
        Write-Warning "❌ 文件不存在: $($r.File)"
        continue
    }
    
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    $oldCount = [regex]::Matches($content, [regex]::Escape($r.Old)).Count
    
    if ($oldCount -eq 0) {
        Write-Warning "⚠️ 未找到匹配: $($r.File) → $($r.Old)"
        continue
    }
    
    $newContent = $content -replace [regex]::Escape($r.Old), $r.New
    $actualChange = $oldCount - [regex]::Matches($newContent, [regex]::Escape($r.New)).Count
    # Check that the old text was actually replaced
    $remainingOld = [regex]::Matches($newContent, [regex]::Escape($r.Old)).Count
    
    if ($remainingOld -eq $oldCount) {
        Write-Warning "❌ 替换失败: $($r.File) → $($r.Old)"
        continue
    }
    
    Set-Content $fullPath $newContent -Encoding UTF8 -NoNewline
    $replacedCount = $oldCount - $remainingOld
    
    if (-not $filesModified.ContainsKey($r.File)) {
        $filesModified[$r.File] = 0
    }
    $filesModified[$r.File] += $replacedCount
    $totalReplaced += $replacedCount
    
    Write-Host "✅ $($r.File): 替换 $replacedCount 处 '$($r.Old)'"
}

# ============================================================
# 输出报告
# ============================================================
Write-Host "`n" + "="*60
Write-Host "📊 修复报告"
Write-Host "="*60
Write-Host "总替换数: $totalReplaced 处"
Write-Host "涉及文件: $($filesModified.Count) 个"
Write-Host "`n修改的文件:"
$filesModified.GetEnumerator() | Sort-Object Name | ForEach-Object {
    Write-Host "  - $($_.Key): $($_.Value) 处"
}

Write-Host "`n💡 验证: 运行 'npm run health:check' 查看断链是否清零"