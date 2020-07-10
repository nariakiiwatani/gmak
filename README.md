GMAK is for MAking Kaptions.

beta site in operation is [here](https://gmak.tech/).  
(Works only in Google Chrome for Desktop.)

# Features

## ready
- Speech recognition with time code
- Downloading captions file in JSON format
- Downloading the audio file

## future
- audio recording
	- download in .wav format
	- select input source
- video recording
	- downloading
	- select input source
- i18n
	- select language for recognition
	- translating into any language afterwards
		- then edit them independently
- UI/layout
	- not tab. but side menu.
	- Audio preview
		- with highlighting current caption
- editing captions
	- display in seconds or time code, frame
	- "shift this and the latter" functionality
	- adding/deleting row
	- adding/deleting/copying tab
	- downloading in vtt format
- using downloaded data
	- import into AfterEffects to generate [this](https://twitter.com/nariakiiwatani/status/1280358237246636032)
	
below are memo for me in Japanese.  
almost same as the future feature above but a bit detailed.

## 音声レコーディング
- wavでDLできるようにする
- マイク選択できるようにする

## ビデオレコーディング
- ビデオのオンオフ
- カメラ選択できるようにする
- 音声と一緒にDLできる
- 後から音声だけDLも可能？要調査

## 多言語対応
- 認識言語を変更できる

### 翻訳
- テーブルごと翻訳して別タブ（takeタブ内に言語タブをつくる）にコピー
- その後は全く別々に編集する。タイムコードの編集も個別に可能。再反映はしない。
- 翻訳APIに文章をどの単位で投げるかは要検討
	- まとめて投げないと前後の文脈汲めなそうとか、
	- そもそも文の途中で途切れてたりとかするし
	- しかしどうしたら一番良いかは言語によって違いそうだし
	- 一旦安直に行毎に投げる仕様にするか？
	- それとも全文を投げて、各行に分割するためのUIを別で作るか？

## UI/レイアウト
- タブじゃなくサイドメニュー的なやつの方が良いかも？ 
- 音声プレビュー
	- タイムラインに応じて行をハイライト表示したい

## 字幕データ編集
- 秒・タイムコード・フレームでの表記切替
- 「ここ以降の開始時刻をシフト」する機能
- 行の追加、削除
- 時刻の編集がしにくい。React Hooksの理解が足りない。
- タブの名前変更
- タブの削除
- タブのコピー

### 字幕データDL
- JSON、VTT
- 翻訳がある場合は統合または別ファイルのJSON、または別ファイルのVTTでDL可能

## AfterEffectsへのインポート
- JSONかVTTから[これ](https://twitter.com/nariakiiwatani/status/1280358237246636032)を生成するスクリプトを書く
	- VTTだとパース面倒そうだしスタイルの反映（もしくは無視）とか考えなきゃいけないのでJSONのみ対応する予定

