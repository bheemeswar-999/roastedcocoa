$output = Join-Path $PSScriptRoot 'public\images'
if (-not (Test-Path $output)) { New-Item -ItemType Directory -Path $output | Out-Null }

$images = @{
    'hero-banner.jpg' = @{ Width = 1600; Height = 900; Text = 'Roasted Cocoa' }
    'dark-chocolate.jpg' = @{ Width = 1200; Height = 800; Text = 'Dark Chocolate' }
    'almond-chocolate.jpg' = @{ Width = 1200; Height = 800; Text = 'Almond Chocolate' }
    'chocolate-truffles.jpg' = @{ Width = 1200; Height = 800; Text = 'Chocolate Truffles' }
    'birthday-gift-box.jpg' = @{ Width = 1200; Height = 800; Text = 'Birthday Gift Box' }
    'festival-chocolate-hamper.jpg' = @{ Width = 1200; Height = 800; Text = 'Festival Hamper' }
    'customized-name-chocolates.jpg' = @{ Width = 1200; Height = 800; Text = 'Customized Chocolates' }
}

foreach ($name in $images.Keys) {
    $meta = $images[$name]
    $bitmap = New-Object System.Drawing.Bitmap($meta.Width, $meta.Height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $start = [System.Drawing.Color]::FromArgb(62, 34, 12)
    $end = [System.Drawing.Color]::FromArgb(201, 146, 92)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(`
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($meta.Width, $meta.Height),
        $start,
        $end
    )
    $graphics.FillRectangle($brush, 0, 0, $meta.Width, $meta.Height)
    $font = New-Object System.Drawing.Font('Segoe UI', 48, [System.Drawing.FontStyle]::Bold)
    $textColor = [System.Drawing.Color]::FromArgb(252, 244, 228)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF(0, 0, $meta.Width, $meta.Height)
    $graphics.DrawString($meta.Text, $font, [System.Drawing.SolidBrush]$textColor, $rect, $format)
    $outFile = Join-Path $output $name
    $bitmap.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $graphics.Dispose()
    $brush.Dispose()
    $bitmap.Dispose()
}
Write-Host "Generated placeholder images in $output"
