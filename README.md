# defi-app
## Android-приложение

WebView-оболочка (`app/`), в APK внутри лежит `index.html` — код не грузится из сети.
Пакет: `com.losiev.defianalytics`.

### Первая настройка (один раз)
1. Settings → Secrets and variables → Actions → создать секрет `STORE_PASSWORD` (≥12 символов).
2. Actions → **Generate signing keystore** → Run. Из лога скопировать текст между `-----BEGIN-----` и `-----END-----` в секрет `KEYSTORE_ENC`. Пароль и этот текст сохранить отдельно.
3. Actions → **Build APK + AAB** → Run. Артефакты: `DeFiAnalytics-APK` (тест на телефоне), `DeFiAnalytics-AAB` (в Play Console).

### Выпуск обновления
1. В `app/build.gradle` поднять `versionCode` (+1) и `versionName`.
2. Собрать, залить AAB в Play Console.
3. **Только когда версия стала доступна в Play** — обновить `version.json` (versionCode, versionName, notes ru/en). Баннер «Доступно обновление» в приложении сравнивает установленный versionCode с этим файлом и по кнопке «Установить» запускает обновление через Google Play.
