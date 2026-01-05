---
title: "BERTVision"
description: "A parameter-efficient compression model architecture for NLP tasks achieving BERT-level performance at a fraction of the computational requirements."
image: "../../assets/images/projects/placeholder.svg"
githubUrl: "https://github.com/cbenge509/BERTVision"
liveUrl: "https://cbenge509.github.io/BERTVision/"
skills:
  - "Deep Learning"
  - "NLP"
  - "Parameter Efficiency"
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

BERTVision is a parameter-efficient compression model architecture that achieves BERT-level performance on NLP tasks while significantly reducing computational and training costs.

## Overview

The project leverages hidden state activations from BERT transformer layers that are typically discarded during inference, enabling near-BERT performance with reduced training time and GPU/TPU requirements.

## Key Achievements

- Successfully demonstrated near-BERT performance across multiple NLP tasks
- Evaluated on Stanford Question Answering Dataset 2.0 (SQuAD 2.0)
- Benchmarked against General Language Understanding Evaluation (GLUE)
- Reduced computational requirements through parameter sharing and transfer learning

## Technologies

Built with TensorFlow and PyTorch, utilizing Azure cloud infrastructure with NVIDIA Tesla V100 GPUs for training. Includes hyperparameter optimization using hyperopt and model ensembling techniques.
