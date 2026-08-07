$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8090/")
$listener.Start()
Write-Host "JanSeva Server running at http://127.0.0.1:8090/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $url = $request.Url.LocalPath
        if ($url -eq '/') { $url = '/index.html' }
        $localPath = Join-Path "C:\Users\Tanmay\.gemini\antigravity\scratch\janseva_platform" $url.TrimStart('/')
        if (Test-Path $localPath) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath)
            switch ($ext) {
                '.html' { $response.ContentType = 'text/html; charset=utf-8' }
                '.css'  { $response.ContentType = 'text/css' }
                '.js'   { $response.ContentType = 'text/javascript' }
                default { $response.ContentType = 'application/octet-stream' }
            }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # ignore context errors
    }
}
