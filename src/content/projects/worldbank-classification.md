---
title: "World Bank Document Classification"
description: "Multi-label, multi-class NLP classification challenge to identify topics in World Bank publications. 1st place finish with 0.6925 F1-micro score."
image: "../../assets/images/projects/placeholder.svg"
githubUrl: "https://github.com/cbenge509/wb2019"
skills:
  - "NLP"
  - "Multi-label Classification"
  - "Neural Networks"
  - "LSTM/GRU"
tools:
  - "Python"
  - "Keras"
  - "TensorFlow"
  - "LightGBM"
category: "winner"
achievement: "1st Place (F1-micro: 0.6925)"
affiliation: "DrivenData"
isFeatured: true
publishDate: 2019-02-15
order: 4
---

A multi-label, multi-class classification challenge focused on identifying topics within World Bank publications.

## Competition

DrivenData Machine Learning Competition with 18,660 training samples to predict labels for 18,738 test documents across categories like Macroeconomics, Poverty Reduction, and Technology.

## Approach

The winning solution addressed significant data quality issues and class imbalance through SMOTE techniques and custom vocabulary development. A critical discovery involved identifying approximately 4,000 training observations inadvertently included in test data, which provided the competitive advantage.

## Technologies

Applied NLP techniques including TF-IDF, word embeddings (Word2Vec, Glove, custom), stemming, and adversarial validation. Built LSTM/GRU neural networks with Keras and TensorFlow, complemented by LightGBM for ensemble methods.
