import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const musicGenres = [
  { id: 1, name: 'Поп', icon: 'Music', gradient: 'from-pink-500 to-purple-500' },
  { id: 2, name: 'Рок', icon: 'Guitar', gradient: 'from-red-500 to-orange-500' },
  { id: 3, name: 'Хип-хоп', icon: 'Mic', gradient: 'from-yellow-500 to-green-500' },
  { id: 4, name: 'Электро', icon: 'Radio', gradient: 'from-cyan-500 to-blue-500' },
  { id: 5, name: 'Джаз', icon: 'Piano', gradient: 'from-indigo-500 to-purple-500' },
  { id: 6, name: 'Классика', icon: 'Music2', gradient: 'from-blue-500 to-teal-500' },
];

const examples = [
  {
    title: 'Летний вечер',
    description: 'Спокойная акустическая мелодия с нотками природы',
    genre: 'Поп',
  },
  {
    title: 'Энергия города',
    description: 'Динамичный электронный трек с мощными битами',
    genre: 'Электро',
  },
  {
    title: 'Ночной джем',
    description: 'Расслабляющий джаз с саксофоном и контрабасом',
    genre: 'Джаз',
  },
];

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: 'Введите описание',
        description: 'Опишите, какую музыку вы хотите создать',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Музыка создана!',
        description: 'Ваш трек готов к прослушиванию',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none" />
      
      <div className="relative">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Music" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold">MusicAI</h1>
            </div>
            <Button variant="outline" className="glass">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Бесплатно
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Создай музыку
              <br />
              из слов
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Опиши свою идеальную мелодию, и нейросеть создаст уникальный трек за секунды
            </p>
          </section>

          <section className="max-w-4xl mx-auto mb-16 animate-scale-in">
            <Card className="glass p-8 gradient-border">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Описание трека
                  </label>
                  <Textarea
                    placeholder="Например: энергичная поп-песня с гитарой для летней вечеринки..."
                    className="min-h-32 bg-background/50 border-white/10 focus:border-primary/50 transition-colors resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Выберите жанр
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {musicGenres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => setSelectedGenre(genre.id)}
                        className={`p-4 rounded-xl bg-gradient-to-br ${genre.gradient} transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          selectedGenre === genre.id
                            ? 'ring-2 ring-white shadow-xl scale-105'
                            : 'opacity-70'
                        }`}
                      >
                        <Icon name={genre.icon as any} size={24} className="mx-auto mb-2 text-white" />
                        <div className="text-sm font-medium text-white">{genre.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-lg font-semibold h-14"
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Создаём магию...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Создать трек
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Примеры треков
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <Card
                  key={index}
                  className="glass p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                    <Icon name="Play" size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{example.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {example.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    {example.genre}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto text-center">
            <Card className="glass p-12 gradient-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-6">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Неограниченные возможности
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Создавай столько треков, сколько захочешь. Абсолютно бесплатно.
              </p>
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">Треков</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">0₽</div>
                  <div className="text-sm text-muted-foreground">Стоимость</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">30с</div>
                  <div className="text-sm text-muted-foreground">Генерация</div>
                </div>
              </div>
            </Card>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-8 mt-16 border-t border-white/10">
          <div className="text-center text-sm text-muted-foreground">
            <p>MusicAI • Создано с помощью искусственного интеллекта</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
