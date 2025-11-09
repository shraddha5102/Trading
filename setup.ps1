# Check if Node.js is installed
$nodeVersion = node --version
if (-not $?) {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
}

Write-Host "Node.js version: $nodeVersion"

# Check if required ports are available
$port = 3000
$portInUse = Get-NetTCPConnection -State Listen | Where-Object LocalPort -eq $port

if ($portInUse) {
    Write-Host "Port $port is in use. Attempting to kill the process..."
    $processId = $portInUse.OwningProcess
    Stop-Process -Id $processId -Force
    Write-Host "Process killed successfully"
}

# Create .env.local if it doesn't exist
if (-not (Test-Path .env.local)) {
    @"
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000/api/ws
"@ | Out-File -FilePath .env.local -Encoding UTF8
    Write-Host "Created .env.local file"
}

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Build the project
Write-Host "Building the project..."
npm run build

# Start the development server
Write-Host "Starting the development server..."
npm run dev