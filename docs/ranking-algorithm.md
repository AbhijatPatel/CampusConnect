# CampusConnect — Explainable DSA Priority Ranking Engine

The ranking engine in CampusConnect replaces opaque black-box scoring with a transparent, configurable, priority-based algorithm implemented in Java using foundational Data Structures & Algorithms.

---

## 1. Algorithmic Principles & Formulas

Candidate suitability is evaluated across 6 distinct weighted dimensions:

$$\text{Composite Score} = (S \times w_1) + (N \times w_2) + (E \times w_3) + (C \times w_4) + (P \times w_5) + (L \times w_6)$$

Where:
- **$S$ (Skill Match Score, 40%)**: Evaluates overlap between candidate skills and job requirements.
  $$S = \min\left(100.0, \frac{|S_{\text{student}} \cap S_{\text{required}}|}{|S_{\text{required}}|} \times 100 + \text{PreferredBonus}\right)$$
- **$N$ (NLP Similarity, 20%)**: TF-IDF cosine similarity between candidate resume text and job description.
- **$E$ (Experience Score, 15%)**: Proportional ratio of candidate work/internship duration relative to job expectations.
- **$C$ (CGPA Score, 10%)**: Standardized academic performance $\left(\frac{\text{CGPA}}{10.0} \times 100\right)$.
- **$P$ (Projects Score, 10%)**: Engineering project portfolio breadth ($\min(100, \text{projectCount} \times 25)$).
- **$L$ (Eligibility, 5%)**: Minimum CGPA threshold verification with penalty deduction.

---

## 2. Data Structures Used

1. **`HashSet<String>`**:
   - Stores normalized lowercase candidate skills and tech stacks.
   - Provides $O(1)$ constant time lookup for every required and preferred skill.
2. **`PriorityQueue<CandidateScoreDetails>` (Max-Heap)**:
   - Maintains the candidate order dynamically using `CandidateScoreComparator`.
   - Ensures the highest scoring candidate is always at the root of the heap.
3. **`HashMap<String, Double>`**:
   - Holds dynamic feature weights and intermediate factor metrics.
4. **`CandidateScoreComparator` (Custom Comparator)**:
   - Primary: Descending by `overallScore`.
   - Secondary (Tie-Breaker): Descending by `skillMatchScore`.
   - Tertiary (Tie-Breaker): Descending by `CGPA`.

---

## 3. Complexity Analysis

### Time Complexity
- **Skill Extraction & Verification**: $O(K)$ where $K$ is the number of required skills, as candidate skill lookup is $O(1)$ in the `HashSet`.
- **Candidate Evaluation**: $O(1)$ mathematical calculation per candidate.
- **Heap Insertion**: $O(\log N)$ for each application.
- **Overall Ranking of $N$ Candidates**:
  $$T(N) = O(N \log N) \quad \text{or} \quad O(N \log K) \text{ for Top-K extraction}$$
- Fast execution: Ranks 100 candidates in $< 5\text{ms}$.

### Space Complexity
- $O(N)$ auxiliary space for the `PriorityQueue` storing candidate score details.
- $O(U)$ memory for the `HashSet` storing candidate unique skill tokens.

---

## 4. Explainability Output

For every candidate, the engine produces natural language explanations:
```
#1 Abhijat Patel
Score: 92.4%
Skill Match: 95% | NLP Similarity: 89% | CGPA: 8.9 | Experience: 1.5 yrs
Why Ranked Highly:
Matches 5/5 required skills (100%). Meets CGPA requirement (8.9 >= 7.0). Built 2 relevant projects. Has 1.5 yrs experience.
```
