# -*- coding: utf-8 -*-
"""
pdf_fill_image_pages.py / pdf_to_md.py 核心逻辑单元测试
覆盖：insert_pages() 页序插入、clean_page() 水印与页码过滤

运行：python -m pytest tests/ -v
或（无 pytest）：python tests/test_pdf_fill.py
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

import pdf_fill_image_pages as fill  # noqa: E402
import pdf_to_md as extract  # noqa: E402


class TestInsertPages(unittest.TestCase):
    """insert_pages(): OCR 页必须插回原 PDF 页序对应位置"""

    SAMPLE = (
        "# 标题\n\n"
        "<!-- 原 PDF 第 2 页 -->\n\n正文二\n\n"
        "<!-- 原 PDF 第 3 页 -->\n\n正文三\n\n"
        "<!-- 原 PDF 第 6 页 -->\n\n正文六\n"
    )

    def test_order_before_and_after(self):
        """首/中/尾三种插入位置都要正确"""
        import re

        out = fill.insert_pages(self.SAMPLE, {1: "补一", 4: "补四", 7: "补七"})
        order = [int(n) for n in re.findall(r"<!-- 原 PDF 第 (\d+) 页", out)]
        self.assertEqual(order, sorted(order))

    def test_full_sequence_restored(self):
        out = fill.insert_pages(self.SAMPLE, {1: "补一", 4: "补四", 5: "补五", 7: "补七"})
        import re

        order = [int(n) for n in re.findall(r"<!-- 原 PDF 第 (\d+) 页", out)]
        self.assertEqual(order, [1, 2, 3, 4, 5, 6, 7])

    def test_original_content_preserved(self):
        out = fill.insert_pages(self.SAMPLE, {4: "补四"})
        for token in ("正文二", "正文三", "正文六", "补四"):
            self.assertIn(token, out)

    def test_insert_between_correct_neighbours(self):
        out = fill.insert_pages(self.SAMPLE, {4: "补四", 5: "补五"})
        self.assertLess(out.index("正文三"), out.index("补四"))
        self.assertLess(out.index("补四"), out.index("<!-- 原 PDF 第 6 页"))

    def test_append_when_no_later_page(self):
        out = fill.insert_pages(self.SAMPLE, {99: "补九十九"})
        self.assertLess(out.index("正文六"), out.index("补九十九"))

    def test_marks_without_suffix_not_confused(self):
        """补齐标记带「（视觉模型 OCR 补齐）」后缀，不能被当成普通页锚点重复匹配"""
        out = fill.insert_pages(self.SAMPLE, {4: "补四"})
        self.assertEqual(out.count("（视觉模型 OCR 补齐）"), 1)


class TestCleanPage(unittest.TestCase):
    """clean_page(): 去水印/页码，但不得误伤正文"""

    def test_strips_institution_watermark(self):
        raw = "公众号【叶学长自考资料网】\n【优课必过】网校出品\n真实正文内容在这里"
        out = extract.clean_page(raw)
        self.assertNotIn("叶学长", out)
        self.assertIn("真实正文内容在这里", out)

    def test_keeps_normal_zhuanchaben_text(self):
        """「广东专插本」是正常用词，含「插本」二字，不能被水印规则误删"""
        raw = "2026广东专插本《高等数学》精编讲义"
        self.assertIn("专插本", extract.clean_page(raw))

    def test_strips_page_numbers(self):
        for junk in ("- 10 -", "第 3 页", "1 / 56", "42"):
            raw = f"{junk}\n正文内容正文内容正文内容"
            out = extract.clean_page(raw)
            self.assertNotIn(junk, out, f"未过滤页码: {junk}")
            self.assertIn("正文内容", out)

    def test_collapses_blank_runs(self):
        out = extract.clean_page("第一段\n\n\n\n\n第二段")
        self.assertEqual(out.count("\n\n"), 1)


if __name__ == "__main__":
    unittest.main(verbosity=2)
