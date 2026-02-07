import { motion } from 'framer-motion';

// Mock data - replace with actual Spotify API integration later
const mockNowPlaying = {
  isPlaying: true,
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  albumArt: null, // Would be actual album art URL
};

export default function SpotifyWidget() {
  const { isPlaying, title, artist } = mockNowPlaying;

  return (
    <motion.div
      className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 max-w-fit"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Spotify icon */}
      <i className="bxl-spotify text-2xl text-green-500"></i>

      {/* Sound bars animation */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-500 rounded-full"
              animate={{
                height: ['40%', '100%', '60%', '100%', '40%'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Track info */}
      <div className="text-sm">
        <p className="font-medium text-gray-800 dark:text-white truncate max-w-[150px]">
          {title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[150px]">
          {artist}
        </p>
      </div>
    </motion.div>
  );
}
