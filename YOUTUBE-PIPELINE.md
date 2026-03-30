# YouTube Faceless Channel Production Pipeline

## Channel Strategy: Multi-Niche Content Factory

### Primary Channels (by RPM)

| Channel | Niche | Est. RPM | Upload Frequency | Format |
|---------|-------|----------|-----------------|--------|
| **Karma Stories** | Revenge/Drama | $12.82 | 3x/week | Narration + stock footage |
| **Money Moves** | Finance | $18-45 CPM | 2x/week | Slides + voiceover |
| **AI Unlocked** | AI Tools | $15-22 CPM | 2x/week | Screen recording + narration |

### Revenue Projections (Conservative)

| Month | Views/month | Revenue (Karma) | Revenue (Finance) | Revenue (AI) |
|-------|-------------|-----------------|-------------------|-------------|
| 1-3 | Pre-monetization | $0 | $0 | $0 |
| 4-6 | 50K | $640 | $900 | $825 |
| 7-12 | 200K | $2,564 | $3,600 | $3,300 |
| 12+ | 500K | $6,410 | $9,000 | $8,250 |

## Production Pipeline (Per Video)

### Step 1: Topic Selection (5 min)
```
Run: python trending_engine.py next --count 5
Pick highest-RPM topic that hasn't been covered
```

### Step 2: Script Generation (15 min)
```
Use Claude to generate full script with:
- Hook (0-15 seconds, pattern interrupt)
- Story/value delivery (body)
- Retention bumps every 2-3 min
- CTA + subscribe prompt
- Timestamps for chapters
```

### Step 3: Voiceover (10-30 min)
**Option A (Free):** ElevenLabs free tier / CapCut TTS
**Option B ($5):** Fiverr voiceover artist
**Option C (Free):** Edge TTS via Python

```bash
# Edge TTS (free, Microsoft voices)
pip install edge-tts
edge-tts --voice "en-US-GuyNeural" --text "script.txt" --write-media output.mp3
```

### Step 4: Visual Assets (30-60 min)
```
Leonardo AI (150/day free):
- B-roll images matching story beats
- Character illustrations (no real faces)
- Scene-setting backgrounds
- Data visualization stills

Ideogram (50/day free):
- Text overlay cards
- Title cards per story
- Stat graphics

Pexels/Pixabay:
- Stock video footage (free, no attribution needed)
```

### Step 5: Editing (60-90 min)
```
CapCut (free):
1. Import voiceover as audio track
2. Add visuals matching narration timing
3. Auto-generate captions (CapCut AI)
4. Add zoom effects on key moments
5. Add background music (Suno AI generated)
6. Add lower thirds for story titles
7. Export 1920x1080 for YouTube, 1080x1920 for Shorts
```

### Step 6: Thumbnail (15 min)
```
Leonardo/Midjourney: Generate base image
Ideogram: Add bold text overlay (3-5 words max)
Formula: Emotion face + bright background + bold text
```

### Step 7: Upload & Optimize (15 min)
```
Title: Keyword in first 5 words, ≤60 chars, emotional trigger
Description: Keyword line 1, summary line 2-3, timestamps, links
Tags: 10-15 related keywords from VidIQ research
End screen: Subscribe + next video
Cards: Link to related videos at retention dip points
```

## Total Production Time Per Video
- Short (60s): 45-60 min
- Long (10-15 min): 3-4 hours
- With practice: 2-3 hours per long video

## Tools Required (All Free)
- CapCut (editing)
- Leonardo AI (images, 150/day)
- Ideogram (text graphics, 50/day)
- Edge TTS or ElevenLabs free (voiceover)
- Suno AI (background music)
- Pexels/Pixabay (stock footage)
- Claude (scripts)
- VidIQ (YouTube SEO research)

## Monetization Timeline
1. **Week 1-4:** Upload 3x/week consistently
2. **Month 2-3:** Push for 1000 subscribers (community posts, shorts, collaborations)
3. **Month 3-4:** Hit 4000 watch hours (long-form content accumulates this)
4. **Month 4:** Apply for YouTube Partner Program
5. **Month 4+:** Revenue starts flowing

## Scaling Strategy
- Each channel runs semi-independently
- Reuse scripts across formats (blog → YouTube → Shorts → TikTok)
- Batch production: script 5 videos → record 5 voiceovers → edit 5 videos
- Eventually hire editors on Fiverr ($20-50/video) once revenue covers cost
