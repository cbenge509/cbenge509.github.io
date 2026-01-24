---
title: "BERTVision"
description: "A novel architecture that treats BERT embeddings as visual tensors, achieving competitive NLP performance at a fraction of the computational cost through cross-domain transfer learning."
image: "../../assets/images/projects/bertvision_project.jpg"
githubUrl: "https://github.com/cbenge509/BERTVision"
liveUrl: "https://cbenge509.github.io/BERTVision/"
skills:
  - "Deep Learning"
  - "NLP"
  - "Transfer Learning"
  - "Model Compression"
tools:
  - "TensorFlow"
  - "PyTorch"
  - "Python"
  - "Azure"
category: "research"
affiliation: "UC Berkeley"
isFeatured: true
publishDate: 2020-12-15
order: 1
---

BERTVision introduces a novel approach to efficient NLP: treating transformer embeddings as visual data. By reshaping BERT's hidden state activations into tensor structures analogous to images (height, width, channels), the architecture enables cross-domain transfer learning techniques traditionally reserved for computer vision.

## The Problem

Fine-tuning BERT for downstream tasks demands substantial computational resources — multiple GPUs, extended training cycles, and significant infrastructure investment. The standard approach discards the rich intermediate representations from BERT's encoder layers, utilizing only the final output. BERTVision challenges this convention.

## The Insight

Rather than fine-tuning the entire 110M+ parameter BERT model, BERTVision extracts embedding information from all encoder layers through partial fine-tuning, then trains a compact secondary model on these representations. The key innovation lies in the AdapterPooler architecture: a custom "LayerWeightShare" adapter that transforms embeddings from all encoder layers, combines them with residual skip connections, and projects to final predictions.

## Results

The architecture was evaluated against two rigorous benchmarks:

- **SQuAD 2.0**: 150,000+ reading comprehension samples with span annotation tasks
- **GLUE Benchmark**: Nine diverse NLP tasks including sentiment analysis, paraphrase detection, and natural language inference

BERTVision achieved competitive results across tasks, with notable victories on specific datasets. On the RTE (Recognizing Textual Entailment) task, BERTVision-base reached 72.6% accuracy compared to BERT-base's 63.9% — a significant margin suggesting the architecture captures linguistic relationships that standard fine-tuning misses.

## Technical Implementation

The project required substantial infrastructure to validate at scale:

- **Compute**: Dual NVIDIA Tesla V100 GPUs on Microsoft Azure
- **Data Pipeline**: ~20TB of extracted embeddings stored on high-performance virtual SSDs
- **Frameworks**: TensorFlow 2.4.1 and PyTorch 1.7.1 for cross-framework validation
- **Optimization**: Hyperopt for hyperparameter search, model ensembling for final predictions

The results demonstrate that near-optimal NLP performance is achievable with dramatically reduced training requirements — opening possibilities for few-shot learning applications and resource-constrained deployment scenarios.
