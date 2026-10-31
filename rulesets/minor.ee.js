
export default {
  "id": "minor.ee",
  "type": "minor",
  "label": "電機工程學系",
  "short": "電機系",
  "totalCredits": 22,
  "source": "115 學年度系網現行輔系必修課程（109.06.30 修訂，仍由 115 學年度申請頁引用）",
  "tags": [
    {
      "id": "tag.minor-ee-prog",
      "label": "輔系電機・計算機程式設計",
      "color": "#4A3F7A"
    },
    {
      "id": "tag.minor-ee-core",
      "label": "輔系電機・電機必修",
      "color": "#635497"
    },
    {
      "id": "tag.minor-ee-lab",
      "label": "輔系電機・電子電路實驗",
      "color": "#7A6BAE"
    },
    {
      "id": "tag.minor-ee-lab2",
      "label": "輔系電機・選修實驗",
      "color": "#9384C2"
    },
    {
      "id": "tag.minor-ee-pro",
      "label": "輔系電機・專業選修",
      "color": "#ACA0D4"
    }
  ],
  "categories": [
    {
      "id": "cat.identity",
      "label": "其他身分",
      "color": "#5B4B8A",
      "minCredits": 22,
      "buckets": [
        {
          "id": "bkt.minor-ee-prog",
          "label": "計算機程式設計",
          "tags": [
            "tag.minor-ee-prog"
          ],
          "minCredits": 3,
          "note": "可採計 EE2310、CS1355、EECS1110、EECS1111"
        },
        {
          "id": "bkt.minor-ee-core",
          "label": "電機必修（六門擇四，12 學分）",
          "tags": [
            "tag.minor-ee-core"
          ],
          "minCredits": 12,
          "note": "邏輯設計／訊號與系統／電路學／電子學一、二／電磁學，六門中修四門；須修電機系或電資院開設之課程，不得以其他學系開設課程抵免修"
        },
        {
          "id": "bkt.minor-ee-lab",
          "label": "電子電路實驗",
          "tags": [
            "tag.minor-ee-lab"
          ],
          "minCredits": 2,
          "note": "指定必修，與下面的選修實驗是兩件事"
        },
        {
          "id": "bkt.minor-ee-lab2",
          "label": "選修實驗（八門任選一門）",
          "tags": [
            "tag.minor-ee-lab2"
          ],
          "minCredits": 2,
          "note": "公告寫 2 或 3 學分，這裡以 2 學分當門檻；修 3 學分的也算通過"
        },
        {
          "id": "bkt.minor-ee-pro",
          "label": "電機系專業選修",
          "tags": [
            "tag.minor-ee-pro"
          ],
          "minCredits": 3,
          "note": "公告沒有指定科目清單，只做學分判定"
        }
      ]
    }
  ],
  "subjectGroups": [
    {
      "id": "grp.minor.ee",
      "label": "電機系輔系應修課程（22 學分）",
      "note": "電機系專業選修 3 學分沒有指定科目，不在這份清單裡，請自己新增課程並掛上「輔系電機・專業選修」標籤；115 下起申請時間為每學期開學第一週。",
      "groups": [
        {
          "id": "grp.minor.ee.prog",
          "label": "計算機程式設計（必修）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "計算機程式設計",
              "credit": 3,
              "tag": "tag.minor-ee-prog",
              "note": "EE2310、CS1355、EECS1110、EECS1111 皆可採計"
            }
          ]
        },
        {
          "id": "grp.minor.ee.core",
          "label": "電機必修（六門擇四）",
          "note": "須修電機系／電資院開設之課程，不得以其他學系課程抵免修。課名刻意加上「（電機系）」，跟主修清單裡同名的別系課程區隔開；請從這份清單匯入，不要自己手打課名",
          "rule": {
            "type": "atLeastCourses",
            "n": 4
          },
          "items": [
            {
              "name": "邏輯設計（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EECS1010"
            },
            {
              "name": "訊號與系統（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EECS2020"
            },
            {
              "name": "電路學（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EE2210"
            },
            {
              "name": "電子學一（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EE2250"
            },
            {
              "name": "電子學二（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EE2260"
            },
            {
              "name": "電磁學（電機系）",
              "credit": 3,
              "tag": "tag.minor-ee-core",
              "note": "EE2140"
            }
          ]
        },
        {
          "id": "grp.minor.ee.lab",
          "label": "電子電路實驗（必修）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "電子電路實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab"
            }
          ]
        },
        {
          "id": "grp.minor.ee.lab2",
          "label": "選修實驗（八門任選一門）",
          "note": "學分依實際開課為準，這裡一律先給 2 學分",
          "rule": {
            "type": "atLeastCourses",
            "n": 1
          },
          "items": [
            {
              "name": "邏輯設計實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "電動機械實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "數位訊號處理實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "光電實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "嵌入式系統與實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "固態電子實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "通訊系統實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            },
            {
              "name": "積體電路設計實驗",
              "credit": 2,
              "tag": "tag.minor-ee-lab2"
            }
          ]
        }
      ]
    }
  ],
  "academicYear": 115,
  "sourceUrl": "https://dee.site.nthu.edu.tw/p/405-1175-1164,c527.php"
};
