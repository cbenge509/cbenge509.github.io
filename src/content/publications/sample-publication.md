---
title: "Attention-Based Visual Question Answering with Multimodal Transformers"
authors:
  - "Cris Benge"
  - "Jane Smith"
  - "John Doe"
venue: "Proceedings of the International Conference on Machine Learning (ICML)"
year: 2023
abstract: "We present a novel approach to visual question answering that leverages attention mechanisms in multimodal transformer architectures. Our method achieves state-of-the-art results on multiple VQA benchmarks while maintaining computational efficiency through a carefully designed cross-attention scheme."
pdfUrl: "../../assets/papers/vqa-transformers-2023.pdf"
codeUrl: "https://github.com/cbenge509/vqa-transformers"
doiUrl: "https://doi.org/10.1234/icml.2023.12345"
---

This paper introduces a multimodal transformer architecture for visual question answering that combines BERT-style language encoding with vision transformer features.

## Abstract

Visual question answering (VQA) requires understanding both visual content and natural language queries. We propose a unified architecture that processes images and text through parallel transformer streams, fusing information via cross-attention layers.

## Key Contributions

1. **Efficient Cross-Attention**: A sparse attention mechanism that reduces computational complexity from O(n²) to O(n log n)
2. **Multimodal Pre-training**: A novel pre-training objective that aligns visual and textual representations
3. **Benchmark Results**: State-of-the-art performance on VQA v2.0, GQA, and Visual Genome datasets

## Citation

If you use this work, please cite:
```bibtex
@inproceedings{benge2023vqa,
  title={Attention-Based Visual Question Answering with Multimodal Transformers},
  author={Benge, Cris and Smith, Jane and Doe, John},
  booktitle={ICML},
  year={2023}
}
```
