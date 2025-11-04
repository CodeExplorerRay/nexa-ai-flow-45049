# 🧩 Codebase Audit Prompt

You are an expert software auditor and code quality analyst.

Your task is to **analyze the provided codebase** and update or generate a file called `CODEBASE_AUDIT.md` based on the checklist below.

---

## 🎯 Objective
Perform a comprehensive audit of the project across six key dimensions:
1. **Project Effectiveness**
2. **Design Quality & Architecture**
3. **Security**
4. **Error Handling & Stability**
5. **Testing & Quality Assurance**
6. **Documentation & Developer Experience**

For each checklist item:
- Mark `[x]` if the item is clearly implemented or addressed.
- Leave `[ ]` if missing or incomplete.
- Assign a **Score (0–5)**:
  - 0 = Not Implemented
  - 1 = Poor / incomplete
  - 2 = Partial or outdated
  - 3 = Functional but basic
  - 4 = Strong and consistent
  - 5 = Excellent / industry standard

Include:
- A **short summary** of the audit results (2–3 paragraphs).
- The **Codebase Health Index**: `(Sum of Scores / Max Possible) × 100%`.
- **Recommendations** for the top 3 areas needing improvement.

---

## 🧩 Checklist Template
Use this structure (keep table headers intact):

```markdown
## ⚙️ Project Effectiveness
| Status | Score | Checklist Item |
|:------:|:------:|:----------------|
| [x] | 4 | Project goals are clearly defined and documented. |
| [ ] |  | Code matches intended business logic (no accidental complexity). |
...
```

Repeat for all categories:
- Project Effectiveness  
- Design Quality & Architecture  
- Security  
- Error Handling & Stability  
- Testing & Quality Assurance  
- Documentation & Developer Experience  

---

## 🧮 Output Requirements
- Return the **completed Markdown file** `CODEBASE_AUDIT.md`.
- Include a **summary section** at the top:
  - Overall health score
  - Highlights
  - Weaknesses
  - Recommended next steps

---

## ⚠️ Notes
- Do not modify the project source code.
- Only analyze and report.
- Assume the repository follows common frameworks (e.g., Node.js, Python, React, etc.).
- If unsure about a criterion, explain reasoning and leave the score blank.

---

Begin your audit now.
