import { useState } from "react";
import "./App.css";

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

const makePlayer = (team, name, typeDesc, image) => ({
  team,
  name,
  description: `${typeDesc}あなたは${name}選手と気が合いそう！`,
  image,
});

const players = {
  A: makePlayer("鹿島アントラーズ","レオ セアラ", "The・ストライカーの", "/images/leo.jpg"),
  B: makePlayer("鹿島アントラーズ","知念 慶（ちねん けい）", "アグレッシブなディフェンスが持ち味の", "/images/chinen.jpg"),
  C: makePlayer("清水エスパルス","マテウス ブエノ", "鋭い縦パスが持ち味の", "/images/bueno.jpg"),
  D: makePlayer("FC東京","俵積田 晃太（たわらつみだ こうた）", "果敢に仕掛けるドリブラーの", "/images/tawaratsumida.jpg"),
  E: makePlayer("京都サンガF.C.","ラファエル エリアス", "冷静沈着なストライカーの", "/images/elias.jpg"),
  F: makePlayer("鹿島アントラーズ","植田 直通（うえだ なおみち）", "闘志溢れるDFの", "/images/nao.jpg"),
  G: makePlayer("ガンバ大阪","ファン アラーノ", "意表をつくパスが持ち味の", "/images/alano.jpg"),
  H: makePlayer("アビスパ福岡","紺野 和也（こんの かずや）", "冷静に相手をいなす", "/images/konno.jpg"),
  I: makePlayer("FC東京","長倉 幹樹（ながくら もとき）", "チームの流れを変えるストライカーの", "/images/nagakura.jpg"),
  J: makePlayer("ガンバ大阪","中谷 進之介（なかたに しんのすけ）", "頼れるディフェンスリーダーの", "/images/nakatani.jpg"),
  K: makePlayer("川崎フロンターレ","脇坂 泰斗（わきざか やすと）", "大きなサイド展開が持ち味の", "/images/wakizaka.jpg"),
  L: makePlayer("柏レイソル","小屋松 知哉（こやまつ ともや）", "華麗なテクニックで相手をかわす", "/images/koyamatsu.jpg"),
  M: makePlayer("清水エスパルス","北川 航也（きたがわ こうや）", "全く動じないPK職人の", "/images/kitagawa.jpg"),
  N: makePlayer("サンフレッチェ広島","荒木 隼人（あらき はやと）", "空中戦では絶対に負けない", "/images/araki.jpg"),
  O: makePlayer("浦和レッズ","西川 周作（にしかわ しゅうさく）", "正確なロングフィードが得意な", "/images/nishikawa.jpg"),
  P: makePlayer("川崎フロンターレ","家長 昭博（（いえなが あきひろ）", "ボールを絶対に取られない鬼キープ力を持った", "/images/ienaga.jpg"),
  Q: makePlayer("ヴィッセル神戸","エリキ", "完璧なポジショニングでゴールを決めるストライカーの", "/images/erik.jpg"),
  R: makePlayer("ガンバ大阪","福岡 将太（ふくおか しょうた）", "粘り強いディフェンスをする", "/images/fukuoka.jpg"),
  S: makePlayer("FC町田ゼルビア","相馬 勇紀（そうま ゆうき）", "正確なキックでゴールとアシストを量産する", "/images/dorami.jpg"),
  T: makePlayer("浦和レッズ","金子 拓郎（かねこ たくろう）", "ワンプレーで試合を変えるドリブラーの", "/images/kaneko.jpg"),
  U: makePlayer("ガンバ大阪","イッサム ジェバリ", "クロスを必ず仕留める", "/images/jebali.jpg"),
  V: makePlayer("ヴィッセル神戸","マテウス トゥーレル", "異様な落ち着きを払った守備職人の", "/images/thuler.jpg"),
  W: makePlayer("川崎フロンターレ","山本 悠樹（やまもと ゆうき）", "チームのリズムを作るパス職人の", "/images/yamamoto.jpg"),
  X: makePlayer("清水エスパルス","乾 貴士（いぬい たかし）", "研ぎ澄まされた感覚を持った技巧派の", "/images/inui.jpg"),
  Y: makePlayer("京都サンガF.C.","奥川 雅也（おくがわ まさや）", "ここぞの爆発力！チームの切り札の", "/images/okugawa.jpg"),
  Z: makePlayer("横浜FC","ユーリ ララ", "インターセプトが売りの", "/images/lara.jpg"),
  AA: makePlayer("柏レイソル","小泉 佳穂（こいずみ よしお）", "正確無比なパスを繰り出す司令塔の", "/images/koizumi.jpg"),
  BB: makePlayer("セレッソ大阪","香川 真司（かがわ しんじ）", "広大な視野を持った静かな技巧派の", "/images/kagawa.jpg"),
  CC: makePlayer("柏レイソル","細谷 真大（ほそや まお）", "チャンスを確実にモノにするストライカーの", "/images/hosoya.jpg"),
  DD: makePlayer("サンフレッチェ広島","川辺 駿（かわべ はやお）", "正確な予測とクレバーな守備が持ち味の", "/images/kawabe.jpg"),
  EE: makePlayer("名古屋グランパス","森島 司（もりしま つかさ）", "ゲームをコントロールする司令塔の", "/images/morishima.jpg"),
  FF: makePlayer("名古屋グランパス","稲垣 祥（いながき しょう）", "安定感が売りのチームの心臓の", "/images/inagaki.jpg"),
  GG: makePlayer("セレッソ大阪","ラファエル ハットン", "連携プレーでゴールを決めるストライカーの", "/images/ratao.jpg"),
  HH: makePlayer("柏レイソル","久保 藤次郎（くぼ とうじろう）", "攻守に渡ってピッチを縦横無尽に駆け回る", "/images/kubo.jpg"),
  II: makePlayer("横浜F・マリノス","ヤン マテウス", "想像力あふれるプレーでチャンスをクリエイトする", "/images/yan.jpg"),
  JJ: makePlayer("ガンバ大阪","宇佐美 貴史（うさみ たかし）", "発想力が輝くファンタジスタの", "/images/usami.jpg"),
  KK: makePlayer("サンフレッチェ広島","ジャーメイン 良（じゃーめいん りょう）", "味方のパスを確実にゴールに繋げるストライカーの", "/images/germain.jpg"),
  LL: makePlayer("アビスパ福岡","安藤 智哉（あんどう ともや）", "危機察知能力に優れたCBの", "/images/ando.jpg"),
  MM: makePlayer("ヴィッセル神戸","扇原 貴宏（おうぎはら たかひろ）", "熱く冷静なベテランボランチの", "/images/ogihara.jpg"),
  NN: makePlayer("川崎フロンターレ","マルシーニョ", "カットインからのシュートが持ち味のウインガーの", "/images/marcinho.jpg"),
  OO: makePlayer("柏レイソル","垣田 裕暉（かきた ゆうき）", "全て自分のところにこぼれてくる！'持ってる'ストライカーの", "/images/kakita.jpg"),
  PP: makePlayer("サンフレッチェ広島","大迫 敬介（おおさこ けいすけ）", "後ろの声は神の声。コーチングでチームを統率するGKの", "/images/osako.jpg"),
  QQ: makePlayer("横浜F・マリノス","天野 純（あまの じゅん）", "魔法がかかったような'エンジェルパス'を持った", "/images/amano.jpg"),
  RR: makePlayer("柏レイソル","小見 洋太（こみ ようた）", "観客を沸かせる華麗なドリブルが持ち味の", "/images/komi.jpg"),
  SS: makePlayer("名古屋グランパス","マテウス カストロ", "ミドルレンジから確実に仕留める", "/images/mateus.jpg"),
  TT: makePlayer("柏レイソル","小島 亨介（こじま りょうすけ）", "神セーブ連発！鉄壁のGKの", "/images/kojima.jpg"),
  UU: makePlayer("柏レイソル","古賀 太陽（こが たいよう）", "安心と信頼のパス。チームの縁の下の力持ちの", "/images/koga.jpg"),
  VV: makePlayer("セレッソ大阪","ルーカス フェルナンデス", "正確無比なドリブルが持ち味のサイドアタッカーの", "/images/lucas.jpg"),
  WW: makePlayer("名古屋グランパス","永井 謙佑（ながい けんすけ）", "一瞬のスピードで相手を置き去りにするスピードスターの", "/images/nagai.jpg"),
  XX: makePlayer("鹿島アントラーズ","早川 友基（はやかわ ともき）", "研ぎ澄まされた感覚でビッグセーブを連発するGKの", "/images/hayakawa.jpg"),
  YY: makePlayer("ファジアーノ岡山","江坂 任（えさか あたる）", "遊び心あふれるパス。戦術眼を持ち合わせたMFの", "/images/esaka.jpg"),
  ZZ: makePlayer("清水エスパルス","カピシャーバ", "個で打開するドリブラーの", "/images/kapixaba.jpg"),
  AAA: makePlayer("FC東京","マルセロ ヒアン", "静かなる闘志を内に秘めたゴールハンターの", "/images/ryan.jpg"),
  BBB: makePlayer("ガンバ大阪","半田 陸（はんだ りく）", "まさに鉄壁。絶対に抜かれないDFの", "/images/handa.jpg"),
  CCC: makePlayer("ガンバ大阪","黒川 圭介（くろかわ けいすけ）", "針の穴を通すような研ぎ澄まされたクロスが持ち味の", "/images/kurokawa.jpg"),
  DDD: makePlayer("横浜FC","福森 晃斗（ふくもり あきと）", "どこからでも決められるFK職人の", "/images/fukumori.jpg"),
  EEE: makePlayer("鹿島アントラーズ","鈴木 優磨（すずき ゆうま）", "チームを熱い闘志で盛り上げる", "/images/yuma.jpg"),
  FFF: makePlayer("鹿島アントラーズ","小池 龍太（こいけ りゅうた）", "したたかに全てをこなすユーティリティープレイヤーの", "/images/koike.jpg"),
  GGG: makePlayer("ガンバ大阪","満田 誠（みつた まこと）", "センス光るパス職人の", "/images/mitsuta.jpg"),
  HHH: makePlayer("アルビレックス新潟","ダニーロ ゴメス", "どんな狭い局面も切り拓くファンタジスタの", "/images/danilo.jpg"),
  III: makePlayer("浦和レッズ","チアゴ サンタナ", "堅実にゴールを重ねる点取り屋の", "/images/santana.jpg"),
  JJJ: makePlayer("ガンバ大阪","一森 純(いちもり じゅん)", "チームを後ろから支える守護神の", "/images/ichimori.jpg"),
  KKK: makePlayer("浦和レッズ","マテウス サヴィオ", "ドリブル、パス、シュート。全てが丁寧な", "/images/savio.jpg"),
  LLL: makePlayer("浦和レッズ","松尾 佑介（まつお ゆうすけ）", "磨いてきたテクニックは誰にも負けない", "/images/matsuo.jpg"),
};


function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (optionIndex) => {
    setAnswers([...answers, optionIndex]);
    setStep(step + 1);
  };

  const getResult = () => {
    const key = answers.join("");
    const type = answerMap[key] || "A";
    return players[type];
  };

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div className="">
        <div className="">
          <h2 className="question">{q.question}</h2>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="op-button"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const result = getResult();

  return (
    <div className="">
      <div className="">
        <h2 className="question">あなたと合うのは…</h2>
        <img src={result.image} alt={result.name} className="question" />
        <p className="results">{result.team}</p>
        <p className="results">{result.name}選手</p>
        <p className="question">{result.description}</p>
        <button
          onClick={() => {
            setStep(0);
            setAnswers([]);
          }}
          className="op-button"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
}

export default App;
