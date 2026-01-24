---
title: "Facial Keypoints Detection"
description: "Computer vision solution using neural network stacking to detect 15 facial landmarks, achieving 2nd place in Kaggle competition."
image: "../../assets/images/projects/facial_keypoints.jpg"
githubUrl: "https://github.com/cbenge509/w4732_final_project"
skills:
  - "Computer Vision"
  - "Deep Learning"
  - "Keypoints Detection"
  - "Model Stacking"
tools:
  - "Python"
  - "Keras"
  - "TensorFlow"
  - "OpenCV"
category: "winner"
achievement: "2nd Place (RMSE: 1.28637)"
affiliation: "UC Berkeley"
isFeatured: true
publishDate: 2020-05-15
order: 3
---

Built a 10-model neural network ensemble that placed 2nd in the Kaggle Facial Keypoints Detection challenge, finishing within 0.004 RMSE of first place. The system predicts 15 facial landmark coordinates on 96x96 grayscale images, handling incomplete annotations where some images contain all 15 points and others only 4.

## The Breakthrough

Analysis revealed the training data came from two distinct sources—one with complete 15-point annotations, another with only 4. Rather than interpolating the missing labels, I split the pipeline: separate model ensembles trained on each subset, predictions merged at inference. This single decision improved RMSE by 0.2 points.

## Architecture

The ensemble combined 10 Level-1 models: custom Conv2D networks, NaimishNet, modified Inception V1/V3, LeNet5, ResNet50, and ResNeXt50. Each model trained with 5-fold cross-validation across 300 epochs on an RTX 4090.

Level-2 stacking generated 435 feature interactions per model (30 coordinates, pairwise multiplication), expanding to 3,255 total features fed into a MultiTaskElasticNet metaregressor. The linear combiner with L1 regularization outperformed neural alternatives—simpler proved more robust.

## Data Pipeline

Manually corrected 56 mislabeled training images. Augmentation included rotations, elastic transforms, Gaussian noise, brightness/contrast scaling, CLAHE, and horizontal flips—each technique validated empirically before inclusion.
