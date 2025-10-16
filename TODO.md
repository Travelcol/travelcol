# TODO: Resolve TypeScript Unused Variable Errors

## Steps to Complete

1. **Remove unused imports and variables from src/components/Tabs/BibleTab.tsx**
   - Remove `IconButton` from imports

2. **Remove unused imports from src/components/Tabs/FootballTab.tsx**
   - Remove `CardMedia` from imports

3. **Fix src/services/animeApi.ts**
   - Remove `ApiState` from imports
   - Remove `API_BASE_URL` constant
   - Remove unused parameters from `fetchTopAnime`: `page`, `limit`, `filter`
   - Remove unused parameters from `searchAnime`: `query`, `page`, `limit`
   - Remove unused parameter from `fetchAnimeDetails`: `id`
   - Remove unused parameters from `fetchSeasonalAnime`: `year`, `season`

4. **Fix src/services/bibleApi.ts**
   - Remove `ApiState` from imports
   - Remove `API_BASE_URL` constant
   - Remove unused parameters from `fetchBibleVerse`: `reference`, `translation`
   - Remove unused parameter from `searchBibleVerses`: `query`

5. **Fix src/services/footballApi.ts**
   - Remove `ApiState` from imports
   - Remove `API_BASE_URL` and `API_KEY` constants
   - Remove unused parameters from `fetchFootballMatches`: `league`, `date`

6. **Fix src/services/videoGamesApi.ts**
   - Remove `ApiState` from imports
   - Remove `API_BASE_URL` and `API_KEY` constants
   - Remove unused parameters from `fetchVideoGames`: `page`, `pageSize`, `search`, `ordering`
   - Remove unused parameter from `fetchGameDetails`: `id`
   - Remove unused parameter from `searchVideoGames`: `query`

7. **Verify fixes**
   - Run TypeScript check to ensure no errors remain
