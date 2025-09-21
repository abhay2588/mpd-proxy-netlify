// Netlify serverless function
export async function handler() {
  // 🔗 Put the MPD URL you want to proxy
  const mpdUrl = 'https://linearjilt_primary.mpdtro.com.my/dash-wv/linear/2504/default_primary.mpd';

  try {
    const resp = await fetch(mpdUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      }
    });

    const buffer = await resp.arrayBuffer();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/dash+xml' },
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: 'Error: ' + err.message };
  }
}
