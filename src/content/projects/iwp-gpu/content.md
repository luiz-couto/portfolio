## Overview

My bachelor's thesis at UFMG: a high-performance implementation of the **Irregular Wavefront Propagation (IWP)** pattern, where elements propagate computations irregularly to their neighbors in a multidimensional space.

## Two phases

1. **Rust** — parallel implementations using Rust's built-in concurrency features
2. **C++/CUDA** — GPU implementations using [Gunrock](https://github.com/gunrock/gunrock), a CUDA library for high-performance graph algorithms

![Benchmark placeholder](./cover.svg)

## Results

The GPU implementation achieved significant speedups on morphological reconstruction and euclidean distance transform workloads.

> Replace this text with the real write-up — numbers, charts and comparisons go here.
