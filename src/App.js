import { useState } from "react";

const questions = [
  {
    question: "休日の過ごし方は？",
    options: ["アクティブに出かける", "家でのんびり", "友達と遊ぶ", "趣味に没頭する"],
  },
  {
    question: "自分の性格は？",
    options: ["明るく元気", "落ち着いている", "ムードメーカー", "真面目"],
  },
  {
    question: "試合で見たいプレーは？",
    options: ["ゴール", "堅実な守備", "パスワーク", "テクニック"],
  },
];

// 回答パターンに応じて選手タイプをマッピング（例）
const answerMap = {
  "000": "A",//The・ストライカー
  "001": "B",//アグレッシブなディフェンスが持ち味
  "002": "C",//鋭い縦パスが持ち味
  "003": "D",//果敢に仕掛けるドリブラー
  "010": "E",//冷静沈着なストライカー
  "011": "F",//闘志溢れるDF
  "012": "G",//意表をつくパス
  "013": "H",//冷静に相手をいなす
  "020": "I",//チームの流れを変えるストライカー
  "021": "J",//ディフェンスリーダー
  "022": "K",//大きなサイド展開が持ち味
  "023": "L",//華麗なテクニックで相手をかわす
  "030": "M",//PK職人
  "031": "N",//空中戦では絶対に負けない
  "032": "O",//正確なロングフィード
  "033": "P",//ボールを絶対に取られない鬼キープ力
  "100": "Q",//完璧なポジショニングでゴールを決めるストライカー
  "101": "R",//粘り強いディフェンス
  "102": "S",//正確なクロスでアシストを量産する
  "103": "T",//ワンプレーで試合を変えるドリブラー
  "110": "U",//華麗なボレーで必ず仕留める
  "111": "V",//異様な落ち着きを払った守備職人
  "112": "W",//チームのリズムを作るパス職人
  "113": "X",//研ぎ澄まされた感覚を持った技巧派
  "120": "Y",//ここぞの爆発力！チームの"切り札"
  "121": "Z",//試合を締めるクローザー
  "122": "AA",//正確無比なパスを繰り出す司令塔
  "123": "BB",//広大な視野を持った静かな技巧派
  "130": "CC",//チャンスを確実にモノにするストライカー
  "131": "DD",//正確な予測とクレバーな守備が持ち味
  "132": "EE",//ゲームをコントロールする司令塔
  "133": "FF",//安定感が売りの影武者
  "200": "GG",//連携プレーでゴールを決めるストライカー
  "201": "HH",//攻守に渡ってピッチを縦横無尽に駆け回る
  "202": "II",//パスに思いやりを乗せる
  "203": "JJ",//発想力が輝くファンタジスタ
  "210": "KK",//味方のパスを確実にゴールに繋げるストライカー
  "211": "LL",//危機察知能力に優れたDF
  "212": "MM",//熱く冷静なベテランMF
  "213": "NN",//カットインからのシュートが持ち味のWG
  "220": "OO",//全て自分のところにこぼれてくる！"持ってる"ストライカー
  "221": "PP",//後ろの声は神の声。コーチングでチームを統率するGK
  "222": "QQ",//魔法がかかったような"エンジェルパス"
  "223": "RR",//観客を沸かせる華麗なドリブル
  "230": "SS",//ミドルレンジから確実に仕留める
  "231": "TT",//神セーブ連発！鉄壁のGK
  "232": "UU",//安心と信頼のパス。チームの縁の下の力持ち
  "233": "VV",//正確無比なドリブルが持ち味のサイドアタッカー
  "300": "WW",//一瞬のスピードで相手を置き去りにするスピードスター
  "301": "XX",//研ぎ澄まされた感覚でビッグセーブを連発するGK
  "302": "YY",//遊び心あふれるパス。戦術眼を持ち合わせたMF
  "303": "ZZ",//個で打開するドリブラー
  "310": "AAA",//静かなる闘志を内に秘めたゴールハンターハンター
  "311": "BBB",//まさに鉄壁。絶対に抜かれないDF
  "312": "CCC",//針の穴を通すような研ぎ澄まされたパスセンス
  "313": "DDD",//どこからでも決められるFK職人
  "320": "EEE",//劣勢をもひっくり返すゲームチェンジャー
  "321": "FFF",//したたかに全てをこなすユーティリティープレイヤー
  "322": "GGG",//センス光るパス職人
  "323": "HHH",//どんな狭い局面も切り拓くファンタジスタ
  "330": "III",//堅実にゴールを重ねる点取り屋
  "331": "JJJ",//チームを後ろから支える守護神
  "332": "KKK",//ドリブル、パス。全てが丁寧
  "333": "LLL"//磨いてきたテクニックは誰にも負けない
};

const makePlayer = (name, typeDesc, image) => ({
  name,
  description: `${typeDesc}あなたは${name}と気が合いそう！`,
  image,
});

const players = {
  A: makePlayer("レオ セアラ選手", "The・ストライカーの", "/images/leo.jpg"),
  B: makePlayer("知念 慶選手", "アグレッシブなディフェンスが持ち味の", "/images/chinen.jpg"),
  C: makePlayer("マテウス ブエノ選手", "鋭い縦パスが持ち味の", "/images/bueno.jpg"),
  D: makePlayer("俵積田 晃太選手", "果敢に仕掛けるドリブラーの", "/images/tawaratsumida.jpg"),
  E: makePlayer("ラファエル エリアス選手", "冷静沈着なストライカーの", "/images/elias.jpg"),
  F: makePlayer("植田 直通選手", "闘志溢れるDFの", "/images/nao.jpg"),
  G: makePlayer("ファン アラーノ選手", "意表をつくパスが持ち味の", "/images/alano.jpg"),
  H: makePlayer("紺野 和也選手", "冷静に相手をいなす", "/images/konno.jpg"),
  I: makePlayer("長倉 幹樹選手", "チームの流れを変えるストライカーの", "/images/nagakura.jpg"),
  J: makePlayer("中谷 進之介選手", "頼れるディフェンスリーダーの", "/images/nakatani.jpg"),
  K: makePlayer("脇坂 泰斗選手", "大きなサイド展開が持ち味の", "/images/wakizaka.jpg"),
  L: makePlayer("小屋松 知哉選手", "華麗なテクニックで相手をかわす", "/images/koyamatsu.jpg"),
  M: makePlayer("北川 航也選手", "全く動じないPK職人の", "/images/kitagawa.jpg"),
  N: makePlayer("荒木 隼人選手", "空中戦では絶対に負けない", "/images/araki.jpg"),
  O: makePlayer("西川 周作選手", "正確なロングフィードが得意な", "/images/nishikawa.jpg"),
  P: makePlayer("家長 昭博選手", "ボールを絶対に取られない鬼キープ力を持った", "/images/ienaga.jpg"),
  Q: makePlayer("エリキ選手", "完璧なポジショニングでゴールを決めるストライカーの", "/images/erik.jpg"),
  R: makePlayer("福岡 将太選手", "粘り強いディフェンスをする", "/images/fukuoka.jpg"),
  S: makePlayer("相馬 勇紀選手", "正確なキックでゴールとアシストを量産する", "/images/dorami.jpg"),
  T: makePlayer("金子 拓郎選手", "ワンプレーで試合を変えるドリブラーの", "/images/kaneko.jpg"),
  U: makePlayer("イッサム ジェバリ選手", "クロスを必ず仕留める", "/images/jebali.jpg"),
  V: makePlayer("マテウス トゥーレル選手", "異様な落ち着きを払った守備職人の", "/images/thuler.jpg"),
  W: makePlayer("山本 悠樹選手", "チームのリズムを作るパス職人の", "/images/yamamoto.jpg"),
  X: makePlayer("乾 貴士選手", "研ぎ澄まされた感覚を持った技巧派の", "/images/inui.jpg"),
  Y: makePlayer("奥川 雅也選手", "ここぞの爆発力！チームの切り札の", "/images/okugawa.jpg"),
  Z: makePlayer("ユーリ ララ選手", "インターセプトが売りの", "/images/lara.jpg"),
  AA: makePlayer("小泉 佳穂選手", "正確無比なパスを繰り出す司令塔の", "/images/koizumi.jpg"),
  BB: makePlayer("香川 真司選手", "広大な視野を持った静かな技巧派の", "/images/kagawa.jpg"),
  CC: makePlayer("細谷 真大選手", "チャンスを確実にモノにするストライカーの", "/images/hosoya.jpg"),
  DD: makePlayer("川辺 駿選手", "正確な予測とクレバーな守備が持ち味の", "/images/kawabe.jpg"),
  EE: makePlayer("森島 司選手", "ゲームをコントロールする司令塔の", "/images/morishima.jpg"),
  FF: makePlayer("稲垣 祥選手", "安定感が売りのチームの心臓の", "/images/inagaki.jpg"),
  GG: makePlayer("ラファエル ハットン選手", "連携プレーでゴールを決めるストライカーの", "/images/ratao.jpg"),
  HH: makePlayer("久保 藤次郎選手", "攻守に渡ってピッチを縦横無尽に駆け回る", "/images/kubo.jpg"),
  II: makePlayer("ヤン マテウス選手", "想像力あふれるプレーでチャンスをクリエイトする", "/images/yan.jpg"),
  JJ: makePlayer("宇佐美 貴史選手", "発想力が輝くファンタジスタの", "/images/usami.jpg"),
  KK: makePlayer("ジャーメイン 良選手", "味方のパスを確実にゴールに繋げるストライカーの", "/images/germain.jpg"),
  LL: makePlayer("安藤 智哉選手", "危機察知能力に優れたCBの", "/images/ando.jpg"),
  MM: makePlayer("扇原 貴宏選手", "熱く冷静なベテランボランチの", "/images/ogihara.jpg"),
  NN: makePlayer("マルシーニョ選手", "カットインからのシュートが持ち味のウインガーの", "/images/marcinho.jpg"),
  OO: makePlayer("垣田 裕暉選手", "全て自分のところにこぼれてくる！'持ってる'ストライカーの", "/images/kakita.jpg"),
  PP: makePlayer("大迫 敬介選手", "後ろの声は神の声。コーチングでチームを統率するGKの", "/images/osako.jpg"),
  QQ: makePlayer("天野 純選手", "魔法がかかったような'エンジェルパス'を持った", "/images/amano.jpg"),
  RR: makePlayer("小見 洋太選手", "観客を沸かせる華麗なドリブルが持ち味の", "/images/komi.jpg"),
  SS: makePlayer("マテウス カストロ選手", "ミドルレンジから確実に仕留める", "/images/mateus.jpg"),
  TT: makePlayer("小島 亨介選手", "神セーブ連発！鉄壁のGKの", "/images/kojima.jpg"),
  UU: makePlayer("古賀 太陽選手", "安心と信頼のパス。チームの縁の下の力持ちの", "/images/koga.jpg"),
  VV: makePlayer("ルーカス フェルナンデス選手", "正確無比なドリブルが持ち味のサイドアタッカーの", "/images/lucas.jpg"),
  WW: makePlayer("永井 謙佑選手", "一瞬のスピードで相手を置き去りにするスピードスターの", "/images/nagai.jpg"),
  XX: makePlayer("早川 友基選手", "研ぎ澄まされた感覚でビッグセーブを連発するGKの", "/images/hayakawa.jpg"),
  YY: makePlayer("江坂 任選手", "遊び心あふれるパス。戦術眼を持ち合わせたMFの", "/images/esaka.jpg"),
  ZZ: makePlayer("カピシャーバ選手", "個で打開するドリブラーの", "/images/kapixaba.jpg"),
  AAA: makePlayer("マルセロ ヒアン選手", "静かなる闘志を内に秘めたゴールハンターの", "/images/ryan.jpg"),
  BBB: makePlayer("半田 陸選手", "まさに鉄壁。絶対に抜かれないDFの", "/images/handa.jpg"),
  CCC: makePlayer("黒川 圭介選手", "針の穴を通すような研ぎ澄まされたクロス", "/images/kurokawa.jpg"),
  DDD: makePlayer("福森 晃斗選手", "どこからでも決められるFK職人の", "/images/fukumori.jpg"),
  EEE: makePlayer("鈴木 優磨選手", "チームを熱い闘志で盛り上げる", "/images/yuma.jpg"),
  FFF: makePlayer("小池 龍太選手", "したたかに全てをこなすユーティリティープレイヤーの", "/images/koike.jpg"),
  GGG: makePlayer("満田 誠選手", "センス光るパス職人の", "/images/mitsuta.jpg"),
  HHH: makePlayer("ダニーロ ゴメス選手", "どんな狭い局面も切り拓くファンタジスタの", "/images/danilo.jpg"),
  III: makePlayer("チアゴ サンタナ選手", "堅実にゴールを重ねる点取り屋の", "/images/santana.jpg"),
  JJJ: makePlayer("一森 純選手", "チームを後ろから支える守護神の", "/images/ichimori.jpg"),
  KKK: makePlayer("マテウス サヴィオ選手", "ドリブル、パス、シュート。全てが丁寧な", "/images/savio.jpg"),
  LLL: makePlayer("松尾 佑介選手", "磨いてきたテクニックは誰にも負けない", "/images/matsuo.jpg"),
};


function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (optionIndex) => {
    setAnswers([...answers, optionIndex]);
    setStep(step + 1);
  };

  const getResult = () => {
    const key = answers.join(""); // 例: [0,1,2] → "012"
    const type = answerMap[key] || "A"; // 該当なしならデフォルトでA
    return players[type];
  };

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl mb-4">{q.question}</h2>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="block mx-auto my-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  const result = getResult();

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-2">あなたの推しは…</h2>
      <img src={result.image} alt={result.name} className="w-48 mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{result.name}</h3>
      <p className="mt-2">{result.description}</p>
    </div>
  );
}

export default App;
