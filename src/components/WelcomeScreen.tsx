import { Button } from '@/components/ui/button'
import { Play, Sparkle, Tree, Gift } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-10 left-10"
      >
        <Tree className="w-24 h-24 text-accent" weight="fill" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
        className="absolute bottom-10 right-10"
      >
        <Gift className="w-20 h-20 text-primary" weight="fill" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="mb-8"
        >
          <Sparkle className="w-16 h-16 mx-auto text-accent mb-6" weight="fill" />
        </motion.div>

        <h1 className="font-display font-bold text-5xl md:text-6xl text-accent mb-4 tracking-tight drop-shadow-lg">
          Kerstliedjes Kwats
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
          Raad het kerstlied aan de hand van verhaspelde uitspraak
        </p>
        
        <div className="bg-card/50 backdrop-blur-md rounded-2xl p-6 mb-10 border border-accent/30 shadow-lg">
          <p className="text-foreground/80 text-lg leading-relaxed">
            Speel rond de tafel, geef de telefoon door, lees de verhaspelde liedjes voor, 
            en laat je vrienden raden welk kerstlied het is!
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Play weight="fill" className="mr-2" size={24} />
          Start het spel
        </Button>
      </motion.div>
    </div>
  )
}
