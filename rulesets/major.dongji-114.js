export default {
  "id": "major.dongji-114",
  "type": "major",
  "label": "動力機械工程學系",
  "short": "動機系",
  "admissionYear": 114,
  "fallbackTag": "tag.major-elective",
  "totalCredits": 129,
  "dataStatus": "verified",
  "source": "114 入學科目表（114 教務章則，印刷頁 176–177）；115 學年度資料另列，入學年規定不混用",
  "options": [
    {
      "id": "track",
      "label": "專業學程（四擇一）",
      "choices": [
        {
          "value": "",
          "label": "— 尚未選擇 —"
        },
        {
          "value": "control",
          "label": "電控學程"
        },
        {
          "value": "nano",
          "label": "奈微米學程"
        },
        {
          "value": "energy",
          "label": "能源學程"
        },
        {
          "value": "precision",
          "label": "精密機械與智慧製造學程"
        }
      ]
    },
    {
      "id": "englishRoute",
      "label": "英文領域修課方案",
      "choices": [
        {
          "value": "advanced-german",
          "label": "進階生：初級德語一、二（6 學分）"
        },
        {
          "value": "standard",
          "label": "一般英文領域（8 學分）"
        }
      ]
    }
  ],
  "tags": [
    {
      "id": "tag.chinese",
      "label": "大學中文",
      "color": "#9C5B3C"
    },
    {
      "id": "tag.english",
      "label": "英文領域",
      "color": "#C08457"
    },
    {
      "id": "tag.ge-core-1",
      "label": "核心通識・向度一",
      "color": "#2F4858"
    },
    {
      "id": "tag.ge-core-2",
      "label": "核心通識・向度二",
      "color": "#3B5170"
    },
    {
      "id": "tag.ge-core-3",
      "label": "核心通識・向度三",
      "color": "#4E6E93"
    },
    {
      "id": "tag.ge-core-4",
      "label": "核心通識・向度四",
      "color": "#6389B5"
    },
    {
      "id": "tag.ge-general",
      "label": "一般通識",
      "color": "#8A94A8"
    },
    {
      "id": "tag.dept",
      "label": "系定必修",
      "color": "#7A2E2E"
    },
    {
      "id": "tag.physics",
      "label": "物理領域",
      "color": "#9E4B45"
    },
    {
      "id": "tag.track",
      "label": "專業學程",
      "color": "#4A6FA1"
    },
    {
      "id": "tag.major-elective",
      "label": "主修選修",
      "color": "#B08D3F"
    },
    {
      "id": "tag.pe-first",
      "label": "大一體育",
      "color": "#39785a"
    },
    {
      "id": "tag.pe",
      "label": "興趣體育",
      "color": "#528d69"
    }
  ],
  "categories": [
    {
      "id": "cat.school",
      "label": "校定必修",
      "color": "#9C5B3C",
      "minCredits": 30,
      "buckets": [
        {
          "id": "bkt.chinese",
          "label": "大學中文",
          "tags": [
            "tag.chinese"
          ],
          "minCredits": 2
        },
        {
          "id": "bkt.english",
          "label": "英文領域",
          "tags": [
            "tag.english"
          ],
          "minCredits": 8,
          "note": "114 入學：通過校定英檢者，得申請免修選讀英文 2 學分；仍須依核定結果規劃"
        },
        {
          "id": "bkt.ge",
          "label": "通識合計",
          "tags": [
            "tag.ge-core-1",
            "tag.ge-core-2",
            "tag.ge-core-3",
            "tag.ge-core-4",
            "tag.ge-general"
          ],
          "minCredits": 20,
          "note": "核心四向度各至少一門；核心與一般通識合計至少 20 學分，兩者不另設各自最低學分。",
          "checks": [
            {
              "type": "minDistinctTags",
              "tags": [
                "tag.ge-core-1",
                "tag.ge-core-2",
                "tag.ge-core-3",
                "tag.ge-core-4"
              ],
              "min": 4,
              "label": "四個核心向度各至少 1 門"
            }
          ]
        }
      ]
    },
    {
      "id": "cat.dept",
      "label": "系定必修",
      "color": "#7A2E2E",
      "minCredits": 64,
      "buckets": [
        {
          "id": "bkt.dept",
          "label": "系定必修科目",
          "tags": [
            "tag.dept"
          ],
          "minCredits": 58
        },
        {
          "id": "bkt.physics",
          "label": "物理領域",
          "tags": [
            "tag.physics"
          ],
          "minCredits": 6,
          "note": "五選二。沒有認列上限，超修的學分仍留在本項",
          "checks": [
            {
              "type": "minCourses",
              "min": 2,
              "label": "至少修 2 門"
            }
          ]
        }
      ]
    },
    {
      "id": "cat.track",
      "label": "專業學程",
      "color": "#4A6FA1",
      "minCredits": 15,
      "buckets": [
        {
          "id": "bkt.track",
          "label": "專業學程",
          "tags": [
            "tag.track"
          ],
          "minCredits": 15,
          "note": "須修 5 門以上：核心 3 門必選＋選修 2 門以上。沒有認列上限",
          "checks": [
            {
              "type": "minCourses",
              "min": 5,
              "label": "至少修 5 門"
            }
          ]
        }
      ]
    },
    {
      "id": "cat.elective",
      "label": "其他選修",
      "color": "#B08D3F",
      "minCredits": 20,
      "buckets": [
        {
          "id": "bkt.elective",
          "label": "主修選修",
          "tags": [
            "tag.major-elective"
          ],
          "minCredits": 20
        }
      ]
    },
    {
      "id": "cat.pe",
      "label": "體育",
      "color": "#39785a",
      "minCredits": 0,
      "countsTowardTotal": false,
      "buckets": [
        {
          "id": "bkt.pe",
          "label": "體育",
          "tags": [
            "tag.pe-first",
            "tag.pe"
          ],
          "minCredits": 0,
          "note": "畢業前須修滿大一體育 1 門及興趣體育 5 門，共 6 門；0 學分，不計入畢業總學分。同一興趣項目可跨學期重修。",
          "checks": [
            {
              "type": "minCourses",
              "min": 6,
              "label": "體育至少 6 門"
            },
            {
              "type": "minCoursesOfTag",
              "tag": "tag.pe-first",
              "min": 1,
              "label": "含大一體育至少 1 門"
            }
          ]
        }
      ]
    }
  ],
  "subjectGroups": [
    {
      "id": "grp.school",
      "label": "校定必修科目",
      "rule": {
        "type": "all"
      },
      "items": [
        {
          "name": "大學中文",
          "credit": 2,
          "tag": "tag.chinese"
        }
      ]
    },
    {
      "id": "grp.dept",
      "label": "系定必修科目",
      "rule": {
        "type": "all"
      },
      "defaultTag": "tag.dept",
      "items": [
        {
          "name": "微積分B一",
          "credit": 3,
          "tag": "tag.dept",
          "aliases": [
            "微積分一",
            "微積分A一"
          ],
          "note": "可選 A 課程（4 學分），請依實際修課調整學分"
        },
        {
          "name": "微積分B二",
          "credit": 3,
          "tag": "tag.dept",
          "aliases": [
            "微積分二",
            "微積分A二"
          ],
          "note": "可選 A 課程（4 學分），請依實際修課調整學分"
        },
        {
          "name": "工程數學一",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "工程數學二",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "基礎熱流學一",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "基礎熱流學二",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "應用力學一",
          "credit": 2,
          "tag": "tag.dept"
        },
        {
          "name": "應用力學二",
          "credit": 2,
          "tag": "tag.dept"
        },
        {
          "name": "專題研究一",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "專題研究二",
          "credit": 2,
          "tag": "tag.dept"
        },
        {
          "name": "固體力學與奈米材料實驗",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "熱流與動力系統實驗",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "普通化學乙",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "普通化學實驗",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "程式設計",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "工程導論",
          "credit": 2,
          "tag": "tag.dept"
        },
        {
          "name": "工程圖學",
          "credit": 2,
          "tag": "tag.dept"
        },
        {
          "name": "工場實習",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "電路學",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "電子學一",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "電子電路實驗一",
          "credit": 1,
          "tag": "tag.dept"
        },
        {
          "name": "材料力學",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "機械製造",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "機械設計",
          "credit": 3,
          "tag": "tag.dept"
        },
        {
          "name": "材料科學導論",
          "credit": 3,
          "tag": "tag.dept"
        }
      ]
    },
    {
      "id": "grp.physics",
      "label": "物理相關課程（五選二）",
      "note": "工程光學、電磁學、近代物理導論為優先推薦",
      "rule": {
        "type": "atLeastCourses",
        "n": 2
      },
      "defaultTag": "tag.physics",
      "items": [
        {
          "name": "工程光學",
          "credit": 3,
          "tag": "tag.physics",
          "note": "優先推薦"
        },
        {
          "name": "電磁學",
          "credit": 3,
          "tag": "tag.physics",
          "note": "優先推薦"
        },
        {
          "name": "近代物理導論",
          "credit": 3,
          "tag": "tag.physics",
          "note": "優先推薦"
        },
        {
          "name": "普通物理B一",
          "credit": 3,
          "tag": "tag.physics",
          "aliases": [
            "普通物理一",
            "普通物理A一"
          ],
          "note": "可選 A 課程（4 學分），請依實際修課調整學分"
        },
        {
          "name": "普通物理B二",
          "credit": 3,
          "tag": "tag.physics",
          "aliases": [
            "普通物理二",
            "普通物理A二"
          ],
          "note": "可選 A 課程（4 學分），請依實際修課調整學分"
        }
      ]
    },
    {
      "id": "grp.track.control",
      "label": "電控學程",
      "when": {
        "option": "track",
        "equals": "control"
      },
      "defaultTag": "tag.track",
      "groups": [
        {
          "id": "grp.track.control.core",
          "label": "核心課程（3 門必選）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "控制系統一",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "控制系統二",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "電子學二",
              "credit": 3,
              "tag": "tag.track"
            }
          ]
        },
        {
          "id": "grp.track.control.elec",
          "label": "選修課程（2 門以上）",
          "rule": {
            "type": "atLeastCourses",
            "n": 2
          },
          "items": [
            {
              "name": "微算機導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "電動機械",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "電磁學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "振動學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "系統動態分析",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "邏輯設計與應用",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "數值分析",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "生醫微型系統晶片",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "微機電系統導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "工程光學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "線性系統理論",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "數位控制系統",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "非線性控制系統",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "機器人學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "人工智慧",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所",
              "aliases": [
                "人工智慧導論"
              ]
            },
            {
              "name": "生醫微系統",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "電子電路分析",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "微奈米系統之感測與致動",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "數位電路分析與設計",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "聲學理論與應用",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "聲學陣列信號處理",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "移動機器人與自駕車專題",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "高等振動學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            }
          ]
        }
      ]
    },
    {
      "id": "grp.track.nano",
      "label": "奈微米學程",
      "when": {
        "option": "track",
        "equals": "nano"
      },
      "defaultTag": "tag.track",
      "groups": [
        {
          "id": "grp.track.nano.core",
          "label": "核心課程（3 門必選）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "微機電系統導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "奈米科技與應用",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "振動學",
              "credit": 3,
              "tag": "tag.track"
            }
          ]
        },
        {
          "id": "grp.track.nano.elec",
          "label": "選修課程（2 門以上）",
          "rule": {
            "type": "atLeastCourses",
            "n": 2
          },
          "items": [
            {
              "name": "微系統概論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "近代物理導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "高等材料力學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "有限單元法導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "光機電系統設計",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "固體與奈微米力學導論",
              "credit": 2,
              "tag": "tag.track"
            },
            {
              "name": "微奈米製造技術",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "奈米結構力學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "微系統設計",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "奈米工程",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "微奈米系統之感測與致動",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "有限單元法",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            }
          ]
        }
      ]
    },
    {
      "id": "grp.track.energy",
      "label": "能源學程",
      "when": {
        "option": "track",
        "equals": "energy"
      },
      "defaultTag": "tag.track",
      "groups": [
        {
          "id": "grp.track.energy.core",
          "label": "核心課程（3 門必選）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "進階流體力學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "能源工程",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "熱傳與質傳學",
              "credit": 3,
              "tag": "tag.track"
            }
          ]
        },
        {
          "id": "grp.track.energy.elec",
          "label": "選修課程（2 門以上）",
          "rule": {
            "type": "atLeastCourses",
            "n": 2
          },
          "items": [
            {
              "name": "數值分析",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "近代物理導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "線性代數",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "飛行力學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "燃燒學概論",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "熱對流",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "計算流體力學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "氣體動力學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "噴射推進",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "層流理論",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "冷凍空調系統模擬與熱交換",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "生醫微熱流",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "電子裝備冷卻系統",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "進階微流體系統",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "實驗熱流學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            }
          ]
        }
      ]
    },
    {
      "id": "grp.track.precision",
      "label": "精密機械與智慧製造學程",
      "when": {
        "option": "track",
        "equals": "precision"
      },
      "defaultTag": "tag.track",
      "groups": [
        {
          "id": "grp.track.precision.core",
          "label": "核心課程（3 門必選）",
          "rule": {
            "type": "all"
          },
          "items": [
            {
              "name": "智慧製造導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "光機電系統設計",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "電腦輔助設計與製造",
              "credit": 3,
              "tag": "tag.track"
            }
          ]
        },
        {
          "id": "grp.track.precision.elec",
          "label": "選修課程（2 門以上）",
          "rule": {
            "type": "atLeastCourses",
            "n": 2
          },
          "items": [
            {
              "name": "控制系統一",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "工程光學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "振動學",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "微機電系統導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "有限單元法導論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "創新工程設計",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "磁性元件概論",
              "credit": 3,
              "tag": "tag.track"
            },
            {
              "name": "精密機械設計一",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "精密機械設計二",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "製程診斷與分析",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "微奈米製造技術",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "光電子學",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所"
            },
            {
              "name": "電腦輔助製造專題",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "演化計算與最佳化",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "移動機器人與自駕車專題",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "微感測器及量測系統之訊號處理",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "微奈米系統之感測與致動",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            },
            {
              "name": "微小尺度系統設計與製作技術",
              "credit": 3,
              "tag": "tag.track",
              "note": "研究所；依實際開課學分調整"
            }
          ]
        }
      ]
    },
    {
      "id": "grp.zero",
      "label": "零學分必修",
      "note": "不計學分，但未通過不得畢業",
      "rule": {
        "type": "all"
      },
      "items": [
        {
          "name": "操行",
          "credit": 0,
          "note": "每學期成績及格"
        }
      ]
    },
    {
      "id": "grp.pe",
      "label": "體育課程（0 學分）",
      "rule": {
        "type": "optional"
      },
      "note": "請加入 1 門大一體育與 5 門興趣體育；完成情形於學分判定的體育類別顯示。",
      "items": [
        {
          "name": "大一體育",
          "credit": 0,
          "tag": "tag.pe-first",
          "note": "必修 1 門"
        },
        {
          "name": "體育（興趣選項）",
          "credit": 0,
          "tag": "tag.pe",
          "note": "必修 5 門；可自行新增實際項目課名"
        }
      ]
    }
  ],
  "sourceUrl": "https://academic.site.nthu.edu.tw/var/file/7/1007/img/4108/712485888.pdf"
};
