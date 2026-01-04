---
title: "BERTVision"
description: "Deep learning model for visual question answering using BERT and attention-based vision transformers"
image: "../../assets/images/projects/bertvision.png"
githubUrl: "https://github.com/cbenge509/bertvision"
skills:
  - "Deep Learning"
  - "Computer Vision"
  - "NLP"
tools:
  - "PyTorch"
  - "BERT"
  - "Python"
category: "builder"
achievement: "Top 5% on VQA benchmark"
isFeatured: true
publishDate: 2023-06-15
order: 1
---

BERTVision is a multimodal deep learning architecture that combines BERT's language understanding with visual attention mechanisms for visual question answering tasks.

## Key Features

- **Multimodal Fusion**: Combines textual and visual features through cross-attention layers
- **Pre-trained Backbone**: Leverages BERT for language encoding and ResNet for visual features
- **Efficient Training**: Implements gradient checkpointing for memory-efficient training on consumer GPUs

## Technical Approach

The model uses a dual-stream architecture where visual features from a pre-trained CNN are projected into BERT's embedding space. A cross-attention mechanism allows the model to focus on relevant image regions when processing questions.

## Results

Achieved top 5% performance on the VQA v2.0 benchmark, demonstrating strong generalization across question types including counting, spatial reasoning, and object recognition.
