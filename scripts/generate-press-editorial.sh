#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/press/editorial"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

FONT_REGULAR="/usr/share/fonts/rsms-inter-fonts/Inter-Regular.ttf"
FONT_BOLD="/usr/share/fonts/rsms-inter-fonts/InterDisplay-Bold.ttf"
FONT_BLACK="/usr/share/fonts/rsms-inter-fonts/InterDisplay-Black.ttf"
LOGO="$ROOT/public/press/logos/betterlectio-app-icon.svg"
WEB_LIGHT="$ROOT/public/press/product/features/web-schedule.png"
WEB_DARK="$ROOT/public/press/product/features/web-dark.png"
LECTIO="$ROOT/public/press/product/features/lectio-before.png"
MOBILE_SCHEDULE="$ROOT/public/press/product/features/mobile-schedule.png"
MOBILE_MESSAGES="$ROOT/public/press/product/features/mobile-messages.png"
MOBILE_HOMEWORK="$ROOT/public/press/product/features/mobile-homework.png"

mkdir -p "$OUT"

rounded_crop() {
  local input="$1" width="$2" height="$3" radius="$4" output="$5"
  local resized="$TMP/resized-$(basename "$output")"
  local mask="$TMP/mask-$(basename "$output")"
  magick "$input" -resize "${width}x${height}^" -gravity center -extent "${width}x${height}" "$resized"
  magick -size "${width}x${height}" xc:none -fill white -draw "roundrectangle 0,0,$((width - 1)),$((height - 1)),$radius,$radius" "$mask"
  magick "$resized" "$mask" -alpha off -compose CopyOpacity -composite "$output"
}

make_logo() {
  local size="$1" output="$2"
  magick -background none "$LOGO" -resize "${size}x${size}" "$output"
}

browser_frame() {
  local input="$1" surface="$2" chrome="$3" line="$4" output="$5"
  local shell="$TMP/shell-$(basename "$output")"
  magick -size 1392x930 xc:none \
    -fill "$surface" -draw 'roundrectangle 0,0,1391,929,34,34' \
    -fill "$line" -draw 'rectangle 0,63,1392,65' \
    -fill '#FF6B63' -draw 'circle 34,32 41,32' \
    -fill '#F4BF4F' -draw 'circle 58,32 65,32' \
    -fill '#58C46B' -draw 'circle 82,32 89,32' \
    -fill "$chrome" -draw 'roundrectangle 548,19,844,45,13,13' \
    "$shell"
  magick "$shell" "$input" -geometry +16+64 -composite "$output"
}

rounded_crop "$WEB_LIGHT" 1360 850 18 "$TMP/web-light.png"
rounded_crop "$WEB_DARK" 1360 850 18 "$TMP/web-dark.png"
rounded_crop "$LECTIO" 980 612 24 "$TMP/lectio.png"
rounded_crop "$WEB_LIGHT" 980 612 24 "$TMP/better.png"
rounded_crop "$MOBILE_SCHEDULE" 420 910 56 "$TMP/mobile-schedule.png"
rounded_crop "$MOBILE_MESSAGES" 420 910 56 "$TMP/mobile-messages.png"
rounded_crop "$MOBILE_HOMEWORK" 420 910 56 "$TMP/mobile-homework.png"
rounded_crop "$WEB_LIGHT" 1668 1042 32 "$TMP/square-web.png"
make_logo 104 "$TMP/logo-104.png"
make_logo 136 "$TMP/logo-136.png"
make_logo 180 "$TMP/logo-180.png"
browser_frame "$TMP/web-light.png" '#FFFFFF' '#ECECE8' '#E4E4E0' "$TMP/browser-light.png"
browser_frame "$TMP/web-dark.png" '#252529' '#34343A' '#38383E' "$TMP/browser-dark.png"

# All phone renders share the same concentric shell. The 16 px bezel follows
# the screen radius instead of adding oversized top and bottom caps.
for screen in schedule messages homework; do
  magick -size 452x942 xc:none \
    -fill '#151517' -draw 'roundrectangle 0,0,451,941,72,72' \
    "$TMP/phone-${screen}-shell.png"
  magick "$TMP/phone-${screen}-shell.png" "$TMP/mobile-${screen}.png" \
    -geometry +16+16 -composite "$TMP/phone-${screen}.png"
done

# 01 - Flagship editorial landscape: an immediately legible brand story with
# real web and mobile UI. Designed to work as an article lead image.
magick -size 2400x1350 xc:'#F5F5F2' \
  -fill '#E8ECF8' -draw 'circle 2220,40 2500,40' \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 24 -annotate +134+110 'BETTERLECTIO' \
  -fill '#3F63D8' -draw 'roundrectangle 134,1084,686,1092,4,4' \
  -fill '#171719' -font "$FONT_BLACK" -pointsize 142 -interline-spacing -16 \
  -annotate +134+332 $'Skolen.\nSamlet.' \
  -fill '#58585E' -font "$FONT_REGULAR" -pointsize 34 -interline-spacing 8 \
  -annotate +142+676 $'Skema, lektier og beskeder\nuden unødvendig støj.' \
  -fill '#171719' -font "$FONT_BOLD" -pointsize 34 -annotate +260+1220 'BetterLectio' \
  "$TMP/overview-base.png"
magick "$TMP/overview-base.png" "$TMP/logo-104.png" -geometry +134+1138 -composite \
  -fill '#0000001A' -draw 'roundrectangle 816,204,2208,1134,34,34' \
  "$TMP/overview-stage.png"
magick "$TMP/overview-stage.png" "$TMP/browser-light.png" -geometry +790+174 -composite \
  -fill '#00000024' -draw 'roundrectangle 1840,374,2292,1316,72,72' \
  "$TMP/overview-device.png"
magick "$TMP/overview-device.png" "$TMP/phone-schedule.png" -geometry +1824+354 -composite \
  -strip -depth 8 -quality 94 "$OUT/editorial-overview-2400.png"

# 02 - Dark landscape: high contrast and plenty of clean negative space for
# publication crops and overlaid headlines.
magick -size 2400x1350 xc:'#131315' \
  -fill '#3F63D8' -draw 'rectangle 0,0,24,1350' \
  -fill '#1D2440' -draw 'circle 2180,1160 2650,1160' \
  -fill '#7D98FF' -font "$FONT_BOLD" -pointsize 24 -annotate +140+112 'BETTERLECTIO' \
  -fill white -font "$FONT_BLACK" -pointsize 118 -interline-spacing -12 \
  -annotate +138+318 $'Ro i\nskoledagen.' \
  -fill '#A7A7AF' -font "$FONT_REGULAR" -pointsize 31 -interline-spacing 8 \
  -annotate +146+650 $'Et samlet overblik,\nbygget til elever.' \
  -fill white -font "$FONT_BOLD" -pointsize 31 -annotate +268+1178 'BetterLectio' \
  "$TMP/dark-base.png"
magick "$TMP/dark-base.png" "$TMP/logo-104.png" -geometry +138+1096 -composite \
  -fill '#00000066' -draw 'roundrectangle 896,244,2288,1174,38,38' \
  "$TMP/dark-stage.png"
magick "$TMP/dark-stage.png" "$TMP/browser-dark.png" -geometry +870+214 -composite \
  -strip -depth 8 -quality 94 "$OUT/editorial-dark-2400.png"

# 03 - Before/after comparison: newsworthy, self-explanatory and based only
# on authentic screenshots.
magick -size 2400x1350 xc:'#ECECEA' \
  -fill '#FFFFFF' -draw 'rectangle 1200,0,2400,1350' \
  -fill '#77777D' -font "$FONT_BOLD" -pointsize 25 -annotate +142+104 'FØR' \
  -fill '#171719' -font "$FONT_BLACK" -pointsize 82 -annotate +142+206 'Lectio' \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 25 -annotate +1260+104 'EFTER' \
  -fill '#171719' -font "$FONT_BLACK" -pointsize 82 -annotate +1260+206 'BetterLectio' \
  -fill '#68686E' -font "$FONT_REGULAR" -pointsize 28 -annotate +142+1260 'Samme skoledag. Et helt andet overblik.' \
  "$TMP/compare-base.png"
magick "$TMP/compare-base.png" \
  -fill '#0000001F' -draw 'roundrectangle 120,290,1140,942,30,30' \
  -fill white -draw 'roundrectangle 100,270,1120,922,30,30' \
  -fill '#0000001F' -draw 'roundrectangle 1260,290,2280,942,30,30' \
  -fill white -draw 'roundrectangle 1240,270,2260,922,30,30' \
  "$TMP/compare-stage.png"
magick "$TMP/compare-stage.png" "$TMP/lectio.png" -geometry +120+290 -composite \
  "$TMP/better.png" -geometry +1260+290 -composite \
  -fill '#D7D7D2' -draw 'roundrectangle 120,1010,1120,1014,2,2' \
  -fill '#3F63D8' -draw 'roundrectangle 1260,1010,2260,1014,2,2' \
  -strip -depth 8 -quality 94 "$OUT/editorial-before-after-2400.png"

# 04 - Portrait/mobile editorial art: a magazine-friendly 4:5 format using
# the same neutral canvas and restrained blue accent as the landscape set.
magick -size 1600x2000 xc:'#F5F5F2' \
  -fill '#3F63D8' -draw 'rectangle 0,0,1600,18' \
  -fill '#E8ECF8' -draw 'circle 1450,160 1760,160' \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 22 -annotate +108+84 'BETTERLECTIO' \
  -fill '#171719' -font "$FONT_BLACK" -pointsize 116 -interline-spacing -12 \
  -annotate +104+240 $'Lectio.\nBare bedre.' \
  -fill '#626268' -font "$FONT_REGULAR" -pointsize 31 \
  -annotate +112+494 'Din skoledag, lige ved hånden.' \
  "$TMP/mobile-base.png"
magick "$TMP/mobile-base.png" \
  -fill '#00000020' -draw 'roundrectangle 142,646,594,1588,72,72' \
  -fill '#00000020' -draw 'roundrectangle 1026,646,1478,1588,72,72' \
  "$TMP/mobile-stage.png"
magick "$TMP/mobile-stage.png" "$TMP/phone-schedule.png" -geometry +126+630 -composite \
  "$TMP/phone-messages.png" -geometry +1010+630 -composite \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 22 -annotate +126+1634 'SKEMA' \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 22 -annotate +1010+1634 'BESKEDER' \
  -fill '#3F63D8' -draw 'roundrectangle 104,1690,1496,1698,4,4' \
  "$TMP/logo-104.png" -geometry +104+1770 -composite \
  -fill '#171719' -font "$FONT_BOLD" -pointsize 36 -annotate +224+1842 'BetterLectio' \
  -strip -depth 8 -quality 94 "$OUT/editorial-mobile-1600.png"

# 05 - Ecosystem landscape: shows cross-device continuity without pretending
# the product is anything other than the real app and browser extension.
magick -size 2400x1350 xc:'#FBFBF8' \
  -fill '#171719' -draw 'rectangle 0,0,780,1350' \
  -fill '#3F63D8' -draw 'rectangle 0,0,20,1350' \
  -fill '#8FA7F0' -font "$FONT_BOLD" -pointsize 22 -annotate +108+104 'BETTERLECTIO' \
  -fill white -font "$FONT_BLACK" -pointsize 92 -interline-spacing -8 \
  -annotate +104+286 $'Ét sted.\nHele dagen.' \
  -fill '#B8B8C0' -font "$FONT_REGULAR" -pointsize 30 -interline-spacing 8 \
  -annotate +112+548 $'På mobilen.\nI browseren.\nAltid genkendeligt.' \
  "$TMP/ecosystem-base.png"
magick "$TMP/ecosystem-base.png" "$TMP/logo-104.png" -geometry +112+1114 -composite \
  -fill white -font "$FONT_BOLD" -pointsize 31 -annotate +232+1182 'BetterLectio' \
  -fill '#00000018' -draw 'roundrectangle 826,170,2218,1100,38,38' \
  "$TMP/ecosystem-stage.png"
magick "$TMP/ecosystem-stage.png" "$TMP/browser-light.png" -geometry +800+140 -composite \
  -fill '#00000022' -draw 'roundrectangle 1812,356,2264,1298,72,72' \
  "$TMP/ecosystem-device.png"
magick "$TMP/ecosystem-device.png" "$TMP/phone-homework.png" -geometry +1796+340 -composite \
  -strip -depth 8 -quality 94 "$OUT/editorial-everywhere-2400.png"

# 06 - Square cover: useful for social cards, newsletters and cropped article
# thumbnails where the product must remain recognizable at small sizes.
magick -size 2000x2000 xc:'#F5F5F2' \
  -fill '#3F63D8' -draw 'rectangle 0,0,20,2000' \
  -fill '#E8ECF8' -draw 'circle 1840,160 2220,160' \
  -fill '#3F63D8' -font "$FONT_BOLD" -pointsize 22 -annotate +120+82 'BETTERLECTIO' \
  -fill '#171719' -font "$FONT_BLACK" -pointsize 126 -interline-spacing -14 \
  -annotate +116+272 $'Din skoledag.\nUden støj.' \
  -fill '#626268' -font "$FONT_REGULAR" -pointsize 34 \
  -annotate +126+566 'BetterLectio til web og mobil.' \
  -fill '#0000001F' -draw 'roundrectangle 142,772,1890,1874,44,44' \
  -fill white -draw 'roundrectangle 116,742,1864,1844,44,44' \
  "$TMP/square-stage.png"
magick "$TMP/square-stage.png" "$TMP/square-web.png" -geometry +156+772 -composite \
  -fill '#00000024' -draw 'roundrectangle 1376,976,1828,1918,72,72' \
  "$TMP/phone-schedule.png" -geometry +1360+960 -composite \
  "$TMP/logo-104.png" -geometry +1746+104 -composite \
  -strip -depth 8 -quality 94 "$OUT/editorial-square-2000.png"

identify "$OUT"/*.png
