以下は、**同一仕様書で「Kiro（仕様駆動）」と「Gemini（一括生成寄り）」を回したときの差**が一目で分かるようにまとめた比較表です。あなたの実感（Kiro＝段階承認で制御しやすい／Gemini＝即プロトタイプ出るが途中経過が薄い）を軸に、最新の公開情報も反映しています。 ([kiro.dev][1])

---

## Kiro vs Gemini 比較表（同一仕様書を入力した前提）

| 観点                 | **Kiro（Spec-Driven Development）**                                                | **Gemini（Code Assist / Gemini系の一括生成体験）**                                            |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 基本思想               | **仕様→設計→実装**の“工程”を作り、順番に進める（ワークフロー前提） ([kiro.dev][1])                            | **対話から即アウトプット**（生成・修正・説明・デバッグ等を都度依頼） ([Google for Developers][2])                   |
| 進め方（体験）            | ステップが分かれ、**各フェーズに意思決定ポイント**がある＝ユーザー承認で前進しやすい ([kiro.dev][3])                     | **一発で成果物が出やすい**（途中の根拠・設計ログは自分で引き出す必要が出がち） ([Google for Developers][2])              |
| 品質コントロール           | 「要求→設計→タスク化」の形に落ちるので、**レビュー観点が固定されやすい**（要求の漏れ・矛盾を早めに潰せる） ([martinfowler.com][4]) | 生成は速いが、**品質は“後追いで差分レビュー”になりやすい**（仕様への適合チェックを自分で設計する必要） ([Google for Developers][2]) |
| AIの制御（暴走しにくさ）      | 仕様を軸に作業が分割されるため、**スコープ逸脱が起きた時に戻しやすい**（あなたの所感に一致） ([kiro.dev][3])                 | 早い反面、**前提がずれたまま走る**ことがある（プロンプトで都度リセット/制約強化が必要） ([Google for Developers][2])         |
| トレーサビリティ（なぜそうなったか） | 各ステップがドキュメント化されやすく、**「どの要求がどの実装に効いたか」**を追いやすい ([martinfowler.com][4])            | 生成物は残るが、**工程の記録は運用次第**（会話ログ・設計メモ・判断ログを自作しがち） ([Google for Developers][2])           |
| プロトタイピング速度         | “設計の時間”を確保する分、**初速はやや遅く見える**（ただし手戻り削減が狙い） ([kiro.dev][5])                        | **初速が速い**。とりあえず動くもの・画面・雰囲気を出すのが得意 ([Google Cloud][6])                               |
| 変更への強さ             | 仕様に戻って調整→再生成の形が取りやすく、**変更理由と影響範囲**が整理しやすい ([kiro.dev][5])                        | 変更依頼は柔軟だが、**全体整合（設計・テスト・ドキュメント）を揃える運用が必要** ([Google for Developers][2])             |
| チーム/ガバナンス          | 工程と成果物（仕様・設計・タスク）が揃うので、**レビュー・合意形成に向く** ([martinfowler.com][4])                  | 個人の試作〜小規模には強いが、**合意形成は別途ドキュメント整備が要る** ([Google for Developers][2])                  |
| 向いてる用途             | 本番品質／仕様の厳密さ／関係者が多い開発／「作る前に決めたい」                                                  | PoC／UIプロトタイプ／不確実性が高い探索／「まず形にしたい」                                                    |

---

## 使い分けの結論（あなたの体験を言語化すると）

* **Kiroは「品質を“工程で作る”」**：段階承認で進むぶん、AIを制御しやすく、仕様の漏れや矛盾を早い段階で潰しやすい。 ([kiro.dev][3])
* **Geminiは「速度で“仮説を増やす”」**：一発目のプロトタイプが速い。代わりに、途中経過（設計意図・判断ログ）は自分で引き出して残す設計が必要。 ([Google for Developers][2])

---

## 実務での“混ぜ方”テンプレ（おすすめ）

* **探索期（0→1）**：Geminiで「画面・APIの叩き台」「未知の論点洗い出し」を高速に作る
* **収束期（1→10）**：Kiroで「要求の確定」「設計」「タスク分割」「レビュー観点固定」をして品質を上げる
* **共通のコツ**：どちらでも、最終的には *仕様→テスト→実装* の整合を人間がチェックする（AI生成の形が違うだけで、検証責任は同じ）

---

* [The Verge](https://www.theverge.com/news/692517/google-gemini-cli-ai-agent-dev-terminal?utm_source=chatgpt.com)
* [The Verge](https://www.theverge.com/news/618839/google-gemini-ai-code-assist-free-individuals-availability?utm_source=chatgpt.com)
* [The Verge](https://www.theverge.com/news/822833/google-antigravity-ide-coding-agent-gemini-3-pro?utm_source=chatgpt.com)
* [The Verge](https://www.theverge.com/google/631726/google-gemini-canvas-audio-overview-notebooklm-coding?utm_source=chatgpt.com)

[1]: https://kiro.dev/docs/specs/?utm_source=chatgpt.com "Specs - IDE - Docs"
[2]: https://developers.google.com/gemini-code-assist/docs/overview?utm_source=chatgpt.com "Gemini Code Assist overview"
[3]: https://kiro.dev/docs/specs/concepts/?utm_source=chatgpt.com "Concepts - IDE - Docs"
[4]: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html?utm_source=chatgpt.com "Understanding Spec-Driven-Development: Kiro, spec-kit ..."
[5]: https://kiro.dev/blog/kiro-and-the-future-of-software-development/?utm_source=chatgpt.com "Kiro and the future of AI spec-driven software development"
[6]: https://codeassist.google/?utm_source=chatgpt.com "Gemini Code Assist | AI coding assistant"

