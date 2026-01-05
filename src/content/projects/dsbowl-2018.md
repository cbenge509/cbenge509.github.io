---
title: "2018 Data Science Bowl"
description: "Instance segmentation challenge to detect cell nuclei in microscopy images for medical research. Top 12% placement in Kaggle competition."
image: "../../assets/images/projects/placeholder.svg"
githubUrl: "https://github.com/cbenge509/dsbowl_2018"
skills:
  - "Computer Vision"
  - "Instance Segmentation"
  - "Deep Learning"
  - "Data Augmentation"
tools:
  - "Python"
  - "Keras"
  - "TensorFlow"
  - "OpenCV"
category: "winner"
achievement: "Top 12% (IOU: 0.41553)"
affiliation: "Kaggle"
isFeatured: true
publishDate: 2018-04-16
order: 5
---

Instance segmentation competition focused on improving nuclei detection from electron microscopy images for medical discovery.

## Challenge

Detected cell nuclei across diverse image types with varying quality, coloration, and cellular conditions. Only 670 images were available with significant labeling issues (15-20% incorrect or missing labels), requiring manual corrections and augmentation techniques.

## Approach

Images came from heterogeneous electron microscopy technologies showing cells in various states (normal, apoptotic, karyorrhexic, with blebbing) from multiple species. Developed custom performance metrics and extensive data augmentation pipelines.

## Technologies

Built with Keras and TensorFlow for deep learning, OpenCV for image processing, and standard Python data science stack (Pandas, NumPy, Matplotlib, Seaborn).
