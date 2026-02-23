const CONTENT = {
  gastronomy: {
    label: 'Gastronomy',
    topics: {
      coffee: {
        label: 'Coffee & Espresso',
        levels: [
          {
            id: 'c1', name: 'Espresso Basics', sub: 'The heart of coffee culture',
            training: [
              { image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=75', title: 'The Art of Espresso', text: 'Espresso is a concentrated coffee beverage brewed by forcing pressurised hot water through finely-ground coffee. It forms the base of many popular drinks including cappuccino, latte, and Americano.', highlight: 'A single espresso shot is typically 30ml and contains about 63mg of caffeine.' },
              { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=75', title: 'Crema — The Golden Layer', text: 'The golden-brown crema on top of an espresso is an emulsion of coffee oils and carbon dioxide. A good crema indicates proper extraction pressure (9 bars) and fresh coffee beans.', highlight: 'Crema should be hazel-coloured, 3–4mm thick, and last 2 minutes.' },
              { image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=75', title: 'Origin & Roasts', text: 'Coffee originates from Ethiopia, where legend says a goat herder named Kaldi noticed his goats became energetic after eating coffee berries. Light roasts retain more origin flavour; dark roasts develop bolder, bitter notes.', highlight: 'Ethiopia, Colombia, and Brazil are the world\'s top three coffee producers.' },
            ],
            questions: [
              { type: 'mcq', question: 'What pressure is used to brew espresso?', options: ['3 bars', '6 bars', '9 bars', '12 bars'], correct: 2, explain: 'Espresso machines use 9 bars of pressure to force hot water through coffee grounds.' },
              { type: 'mcq', question: 'Which country is the world\'s largest coffee producer?', options: ['Colombia', 'Ethiopia', 'Vietnam', 'Brazil'], correct: 3, explain: 'Brazil has been the world\'s leading coffee producer for over 150 years, producing about 40% of global supply.' },
              { type: 'mcq', question: 'What gives espresso its golden crema?', options: ['Milk proteins', 'Coffee oils and CO₂', 'Sugar caramelisation', 'Water minerals'], correct: 1, explain: 'Crema is an emulsion of coffee oils and dissolved CO₂, created by the high pressure extraction.' },
              { type: 'match', instruction: 'Match the espresso drink to its description.', pairs: [{ left: 'Americano', right: 'Espresso + hot water' }, { left: 'Macchiato', right: 'Espresso + dash of milk' }, { left: 'Ristretto', right: 'Short, concentrated espresso' }, { left: 'Lungo', right: 'Long, diluted espresso' }] },
              { type: 'mcq', question: 'A "ristretto" is:', options: ['A very long espresso', 'A double shot', 'A very short, concentrated shot', 'Espresso with cream'], correct: 2, explain: 'Ristretto (Italian for "restricted") uses the same amount of coffee but half the water, making it more concentrated.' },
              { type: 'mcq', question: 'What does "single origin" coffee mean?', options: ['One type of bean', 'Coffee from one specific region', 'Organically grown', 'One roast level'], correct: 1, explain: 'Single origin means the coffee comes from one specific country, region, or even single farm.' },
              { type: 'match', instruction: 'Match coffee brewing method to its origin country.', pairs: [{ left: 'Moka Pot', right: 'Italy' }, { left: 'Chemex', right: 'USA' }, { left: 'AeroPress', right: 'USA' }, { left: 'Turkish Coffee', right: 'Turkey/Middle East' }] },
              { type: 'mcq', question: 'Coffee arabica vs robusta: which has more caffeine?', options: ['Arabica', 'Robusta', 'They\'re equal', 'Depends on roast'], correct: 1, explain: 'Robusta contains almost twice the caffeine of arabica (2.7% vs 1.5%). Arabica is prized for flavour complexity.' },
            ],
          },
          {
            id: 'c2', name: 'Milk & Latte Art', sub: 'Crafting the perfect pour',
            training: [
              { image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=75', title: 'Steaming Milk to Perfection', text: 'Milk steaming is about creating microfoam — tiny, uniform bubbles that give milk a silky, velvety texture. The ideal temperature is 60–65°C. Overheating above 70°C burns the sugars and creates bitter, flat foam.', highlight: 'Whole milk is easiest to steam due to its fat content; oat milk creates surprisingly good microfoam.' },
              { image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=75', title: 'Latte Art Basics', text: 'Latte art is poured, not drawn. By controlling the flow of steamed milk into espresso, baristas create patterns. The heart is the beginner pattern; the rosette requires wrist motion; the tulip needs layered pours.', highlight: 'The World Latte Art Championship was first held in 2005 in Seattle, the birthplace of modern coffeehouse culture.' },
            ],
            questions: [
              { type: 'mcq', question: 'What is the ideal milk steaming temperature?', options: ['45–50°C', '60–65°C', '75–80°C', '90–95°C'], correct: 1, explain: '60–65°C produces the best microfoam texture and brings out milk\'s natural sweetness without burning.' },
              { type: 'mcq', question: 'What is "microfoam"?', options: ['Foam with large bubbles', 'Cold frothed milk', 'Tiny, uniform bubbles creating silky texture', 'Foam from non-dairy milk'], correct: 2, explain: 'Microfoam has bubbles so small they\'re invisible, giving steamed milk a velvety, glossy appearance.' },
              { type: 'mcq', question: 'A cappuccino has how many equal parts?', options: ['2 equal parts', '3 equal parts', '4 equal parts', 'Varies by recipe'], correct: 1, explain: 'A traditional cappuccino is 1/3 espresso, 1/3 steamed milk, 1/3 foam — three equal parts.' },
              { type: 'match', instruction: 'Match the milk-based drink to its milk ratio.', pairs: [{ left: 'Flat White', right: 'Small, strong — 150ml' }, { left: 'Latte', right: 'Large, milky — 250–350ml' }, { left: 'Cappuccino', right: 'Equal thirds — 180ml' }, { left: 'Cortado', right: '1:1 espresso to milk' }] },
              { type: 'mcq', question: 'Which non-dairy milk is most popular among baristas?', options: ['Almond milk', 'Soy milk', 'Oat milk', 'Coconut milk'], correct: 2, explain: 'Oat milk has become the dominant non-dairy barista choice due to its ability to steam and texture well.' },
            ],
          },
        ],
      },
      wine: {
        label: 'Wine & Sommellerie',
        levels: [
          {
            id: 'w1', name: 'Wine Fundamentals', sub: 'Grapes, regions & styles',
            training: [
              { image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=75', title: 'Understanding Wine Grapes', text: 'Wine is made from fermented grape juice. The two main species are Vitis vinifera (European) and Vitis labrusca (American). Key red grapes include Cabernet Sauvignon, Merlot, and Pinot Noir. Key whites include Chardonnay, Sauvignon Blanc, and Riesling.', highlight: 'There are over 10,000 grape varieties worldwide, but just 10 varieties account for over a quarter of all wine produced.' },
              { image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=75', title: 'Old World vs New World', text: 'Old World wines (Europe) tend toward earthy, mineral, lower-alcohol styles. New World wines (Americas, Australia, South Africa) are typically fruit-forward with higher alcohol. France, Italy, and Spain dominate Old World production.', highlight: 'France\'s Bordeaux and Burgundy regions set the global benchmark for red and white wines respectively.' },
              { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75', title: 'The Wine Label', text: 'European wines are often labelled by region (Bordeaux, Chianti, Rioja). New World wines are typically labelled by grape variety. "Appellation" or "AOC" on a French label guarantees the wine meets strict regional production standards.', highlight: 'Champagne can only legally come from the Champagne region of France.' },
            ],
            questions: [
              { type: 'mcq', question: 'Which grape makes red Burgundy wine?', options: ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Syrah'], correct: 2, explain: 'Red Burgundy (Bourgogne Rouge) is made exclusively from Pinot Noir grapes.' },
              { type: 'mcq', question: 'Champagne can only legally come from:', options: ['Any French region', 'The Champagne region of France', 'France or Italy', 'Any EU country'], correct: 1, explain: 'Protected Designation of Origin (PDO) law reserves the name "Champagne" exclusively for sparkling wines from the Champagne region.' },
              { type: 'match', instruction: 'Match the wine style to its origin region.', pairs: [{ left: 'Chianti', right: 'Tuscany, Italy' }, { left: 'Rioja', right: 'Spain' }, { left: 'Chablis', right: 'Burgundy, France' }, { left: 'Barossa Shiraz', right: 'South Australia' }] },
              { type: 'mcq', question: 'Tannins in wine come primarily from:', options: ['Grape juice', 'Grape skins and seeds', 'Oak barrels', 'Yeast'], correct: 1, explain: 'Tannins are polyphenols found primarily in grape skins, seeds, and stems (and also from oak aging).' },
              { type: 'mcq', question: 'What does "Brut" mean on a Champagne label?', options: ['Extra sweet', 'Dry (low sugar)', 'Extra strong', 'Aged longer'], correct: 1, explain: 'Brut means dry — less than 12g/L of residual sugar. "Extra Brut" is even drier.' },
              { type: 'mcq', question: 'Bordeaux blends typically feature which grape as dominant?', options: ['Pinot Noir', 'Syrah', 'Cabernet Sauvignon or Merlot', 'Grenache'], correct: 2, explain: 'Left Bank Bordeaux is Cabernet Sauvignon-dominant; Right Bank (Pomerol, St-Emilion) is Merlot-dominant.' },
              { type: 'match', instruction: 'Match white grape to its typical flavour profile.', pairs: [{ left: 'Riesling', right: 'Citrus, petrol, high acid' }, { left: 'Chardonnay', right: 'Butter, apple, oak' }, { left: 'Sauvignon Blanc', right: 'Grass, grapefruit, crisp' }, { left: 'Gewürztraminer', right: 'Rose, lychee, spice' }] },
              { type: 'mcq', question: 'A "Sommelier" is:', options: ['A wine maker', 'A wine waiter/expert', 'A wine taster', 'A vineyard owner'], correct: 1, explain: 'A sommelier is a trained wine professional responsible for selecting, storing, and serving wine — typically in restaurants.' },
            ],
          },
        ],
      },
    },
  },
  popculture: {
    label: 'Pop Culture',
    topics: {
      tv: {
        label: 'Television & Streaming',
        levels: [
          {
            id: 'tv1', name: 'Prestige TV Era', sub: 'The golden age of television',
            training: [
              { image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=75', title: 'The Prestige TV Revolution', text: 'The late 1990s–2000s ushered in the "Third Golden Age" of television. HBO led this charge with The Sopranos (1999), followed by The Wire, Deadwood, and Game of Thrones. These shows featured complex narratives, anti-heroes, and cinematic production values.', highlight: 'The Sopranos is widely credited as the first "prestige" TV show — it won 21 Emmy Awards.' },
              { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=75', title: 'The Streaming Wars', text: 'Netflix launched streaming in 2007 and original content with House of Cards in 2013. Now Amazon Prime, HBO Max, Disney+, Apple TV+, and Peacock compete for subscribers. This has fundamentally shifted how and when audiences consume television.', highlight: 'Netflix has over 260 million subscribers across 190 countries as of 2024.' },
              { image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=75', title: 'Record-Breaking Shows', text: 'Game of Thrones held viewership records for years. Breaking Bad is often cited as the greatest TV show by critics. Squid Game became Netflix\'s most-watched series ever in 2021, demonstrating the global appetite for non-English content.', highlight: 'Squid Game reached 111 million households in its first 28 days on Netflix.' },
            ],
            questions: [
              { type: 'mcq', question: 'Which show is considered the first "prestige TV" series?', options: ['The Wire', 'Breaking Bad', 'The Sopranos', 'Six Feet Under'], correct: 2, explain: 'The Sopranos (1999) is widely credited as launching the prestige TV era with its complex anti-hero narrative.' },
              { type: 'mcq', question: 'Netflix launched original content with which show?', options: ['Stranger Things', 'Orange Is the New Black', 'House of Cards', 'Narcos'], correct: 2, explain: 'House of Cards (2013) was Netflix\'s first original scripted series, starring Kevin Spacey.' },
              { type: 'match', instruction: 'Match the show to its network/platform.', pairs: [{ left: 'Succession', right: 'HBO' }, { left: 'The Boys', right: 'Amazon Prime' }, { left: 'Ted Lasso', right: 'Apple TV+' }, { left: 'The Mandalorian', right: 'Disney+' }] },
              { type: 'mcq', question: 'Squid Game is from which country?', options: ['Japan', 'China', 'South Korea', 'Thailand'], correct: 2, explain: 'Squid Game is a South Korean survival drama created by Hwang Dong-hyuk.' },
              { type: 'mcq', question: 'Breaking Bad is set primarily in which US city?', options: ['Phoenix', 'Denver', 'Albuquerque', 'Las Vegas'], correct: 2, explain: 'Breaking Bad is set in Albuquerque, New Mexico, following chemistry teacher Walter White\'s transformation into a drug kingpin.' },
              { type: 'mcq', question: '"Peak TV" refers to:', options: ['The highest-rated show ever', 'The era of too much TV content', 'The best year for television', 'A streaming analytics term'], correct: 1, explain: '"Peak TV" was coined by FX\'s John Landgraf to describe the overwhelming volume of scripted series — over 600/year.' },
              { type: 'match', instruction: 'Match the show to its genre.', pairs: [{ left: 'Chernobyl', right: 'Historical drama/miniseries' }, { left: 'Atlanta', right: 'Comedy-drama' }, { left: 'True Detective', right: 'Crime anthology' }, { left: 'Euphoria', right: 'Teen drama' }] },
              { type: 'mcq', question: 'The Emmy Awards are given for excellence in:', options: ['Film', 'Music', 'Television', 'Theatre'], correct: 2, explain: 'The Emmy Awards, presented by the Television Academy, recognise excellence in the television industry.' },
            ],
          },
        ],
      },
    },
  },
  history: {
    label: 'History',
    topics: {
      ancient: {
        label: 'Ancient Civilisations',
        levels: [
          {
            id: 'h1', name: 'Ancient Egypt', sub: 'Pharaohs, pyramids & the Nile',
            training: [
              { image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=75', title: 'The Gift of the Nile', text: 'Ancient Egyptian civilisation arose around 3100 BCE when Upper and Lower Egypt unified under Pharaoh Narmer. The Nile\'s annual floods deposited rich silt, enabling agriculture in the desert. The Egyptians divided their calendar into three seasons: flooding (Akhet), planting (Peret), and harvesting (Shemu).', highlight: 'The Great Pyramid of Giza was the world\'s tallest man-made structure for 3,800 years.' },
              { image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=75', title: 'Pharaohs & Gods', text: 'Pharaohs were considered divine kings — the earthly embodiment of the god Horus. Key pharaohs include Ramesses II ("the Great"), who ruled 66 years; Cleopatra VII, the last pharaoh; and Tutankhamun, whose intact tomb was discovered in 1922.', highlight: 'Ramesses II had over 100 children and lived to approximately 90 years of age.' },
              { image: 'https://images.unsplash.com/photo-1590146758147-3d9d2f0ebb31?w=800&q=75', title: 'Hieroglyphics & Papyrus', text: 'Hieroglyphics were the formal writing system of ancient Egypt, using over 700 symbols. The Rosetta Stone (196 BCE) — discovered in 1799 — allowed scholars to decode hieroglyphics by presenting the same text in three scripts.', highlight: 'The Rosetta Stone is the most-visited object in the British Museum.' },
            ],
            questions: [
              { type: 'mcq', question: 'Ancient Egypt was unified by which pharaoh around 3100 BCE?', options: ['Ramesses II', 'Tutankhamun', 'Narmer', 'Cleopatra'], correct: 2, explain: 'Pharaoh Narmer (also known as Menes) unified Upper and Lower Egypt around 3100 BCE.' },
              { type: 'mcq', question: 'The Rosetta Stone was key to decoding:', options: ['Cuneiform', 'Hieroglyphics', 'Linear B', 'Sanskrit'], correct: 1, explain: 'Jean-François Champollion used the Rosetta Stone in 1822 to crack the hieroglyphic code.' },
              { type: 'match', instruction: 'Match the Egyptian god to their domain.', pairs: [{ left: 'Ra', right: 'Sun god' }, { left: 'Osiris', right: 'Death and afterlife' }, { left: 'Anubis', right: 'Embalming and mummies' }, { left: 'Thoth', right: 'Knowledge and writing' }] },
              { type: 'mcq', question: 'Who discovered Tutankhamun\'s tomb in 1922?', options: ['Heinrich Schliemann', 'Howard Carter', 'Jean-François Champollion', 'Arthur Evans'], correct: 1, explain: 'British archaeologist Howard Carter discovered Tutankhamun\'s nearly intact tomb in the Valley of the Kings.' },
              { type: 'mcq', question: 'Cleopatra VII was the last ruler of:', options: ['The Roman Republic', 'Ptolemaic Egypt', 'The New Kingdom', 'The Hittite Empire'], correct: 1, explain: 'Cleopatra VII was the last active ruler of Ptolemaic Egypt before it became a Roman province in 30 BCE.' },
              { type: 'mcq', question: 'The Great Sphinx of Giza is believed to represent:', options: ['Ramesses II', 'Tutankhamun', 'Khafre', 'Khufu'], correct: 2, explain: 'Most Egyptologists believe the Sphinx represents Pharaoh Khafre, who also built the second-largest Giza pyramid.' },
              { type: 'match', instruction: 'Match the pyramid to its pharaoh.', pairs: [{ left: 'Great Pyramid of Giza', right: 'Khufu (Cheops)' }, { left: 'Pyramid of Khafre', right: 'Khafre' }, { left: 'Red Pyramid', right: 'Sneferu' }, { left: 'Step Pyramid', right: 'Djoser' }] },
              { type: 'mcq', question: 'Ancient Egyptians wrote on which material?', options: ['Parchment', 'Papyrus', 'Vellum', 'Clay tablets'], correct: 1, explain: 'Papyrus, made from the papyrus plant growing along the Nile, was the primary writing material in ancient Egypt.' },
            ],
          },
          {
            id: 'h2', name: 'Ancient Greece', sub: 'Democracy, philosophy & the Olympics',
            training: [
              { image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=75', title: 'The Greek City-States', text: 'Ancient Greece was not a single nation but a collection of city-states (poleis). Athens pioneered democracy; Sparta built a military society. Their rivalry led to the Peloponnesian War (431–404 BCE). Alexander the Great later spread Greek culture across Asia.', highlight: 'Athens was the largest Greek city-state with a population of around 300,000 including slaves.' },
              { image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=75', title: 'Philosophy & Science', text: 'The Greeks laid the foundations of Western philosophy. Socrates taught through questioning (Socratic method); Plato wrote The Republic describing an ideal state; Aristotle tutored Alexander the Great and catalogued knowledge across science, logic, and ethics.', highlight: 'Aristotle wrote over 200 treatises — only 31 survive today.' },
            ],
            questions: [
              { type: 'mcq', question: 'The first Olympic Games were held in which year?', options: ['776 BCE', '490 BCE', '336 BCE', '146 BCE'], correct: 0, explain: 'The ancient Olympic Games began in 776 BCE at Olympia, held every four years to honour Zeus.' },
              { type: 'mcq', question: 'Socrates was the teacher of:', options: ['Aristotle', 'Plato', 'Pythagoras', 'Herodotus'], correct: 1, explain: 'Socrates taught Plato, who in turn taught Aristotle — creating the foundational chain of Western philosophy.' },
              { type: 'match', instruction: 'Match the Greek philosopher to their most famous work/idea.', pairs: [{ left: 'Plato', right: 'The Republic' }, { left: 'Aristotle', right: 'Nicomachean Ethics' }, { left: 'Pythagoras', right: 'Theorem about right triangles' }, { left: 'Herodotus', right: 'Father of History' }] },
              { type: 'mcq', question: 'The Parthenon is dedicated to which goddess?', options: ['Aphrodite', 'Hera', 'Athena', 'Artemis'], correct: 2, explain: 'The Parthenon on the Acropolis was built for Athena, patron goddess of Athens, between 447–432 BCE.' },
              { type: 'mcq', question: 'Alexander the Great was tutored by:', options: ['Socrates', 'Plato', 'Aristotle', 'Pythagoras'], correct: 2, explain: 'Aristotle tutored the young Alexander from age 13 to 16, shaping his intellectual curiosity.' },
            ],
          },
        ],
      },
      modern: {
        label: 'Modern History',
        levels: [
          {
            id: 'mh1', name: 'World War II', sub: 'The defining conflict of the 20th century',
            training: [
              { image: 'https://images.unsplash.com/photo-1569225591195-7b49dde37fc0?w=800&q=75', title: 'Causes of WWII', text: 'World War II (1939–1945) was triggered by Germany\'s invasion of Poland on September 1, 1939. Its deeper causes included the humiliating Treaty of Versailles (1919), the Great Depression, the rise of fascism in Germany and Italy, and the failure of appeasement policies.', highlight: 'WWII involved over 30 countries and caused an estimated 70–85 million deaths — the deadliest conflict in history.' },
              { image: 'https://images.unsplash.com/photo-1555487505-8603a1a69755?w=800&q=75', title: 'Key Turning Points', text: 'The war\'s major turning points include the Battle of Britain (1940), Operation Barbarossa — Germany\'s invasion of the USSR (1941), the attack on Pearl Harbor drawing the USA in (1941), the Battle of Stalingrad (1942–43), and D-Day (June 6, 1944).', highlight: 'The Battle of Stalingrad was the largest and bloodiest battle in history with nearly 2 million casualties.' },
            ],
            questions: [
              { type: 'mcq', question: 'D-Day (June 6, 1944) was the Allied invasion of:', options: ['Italy', 'Greece', 'Normandy, France', 'The Netherlands'], correct: 2, explain: 'Operation Overlord — D-Day — was the Allied invasion of Nazi-occupied France at Normandy beaches.' },
              { type: 'mcq', question: 'Which event brought the United States into WWII?', options: ['Fall of France', 'Battle of Britain', 'Attack on Pearl Harbor', 'German invasion of Poland'], correct: 2, explain: 'Japan\'s surprise attack on Pearl Harbor, Hawaii on December 7, 1941 led the US to declare war.' },
              { type: 'match', instruction: 'Match the WWII leader to their country.', pairs: [{ left: 'Winston Churchill', right: 'United Kingdom' }, { left: 'Franklin D. Roosevelt', right: 'United States' }, { left: 'Joseph Stalin', right: 'Soviet Union' }, { left: 'Charles de Gaulle', right: 'Free France' }] },
              { type: 'mcq', question: 'The atomic bombs were dropped on which two Japanese cities?', options: ['Tokyo and Osaka', 'Hiroshima and Nagasaki', 'Kyoto and Kobe', 'Hiroshima and Osaka'], correct: 1, explain: 'The US dropped atomic bombs on Hiroshima (Aug 6) and Nagasaki (Aug 9), 1945, leading to Japan\'s surrender.' },
              { type: 'mcq', question: 'VE Day (Victory in Europe) was celebrated on:', options: ['May 8, 1945', 'August 15, 1945', 'June 6, 1944', 'April 30, 1945'], correct: 0, explain: 'VE Day (Victory in Europe Day) marked Germany\'s unconditional surrender on May 8, 1945.' },
            ],
          },
        ],
      },
    },
  },
  art: {
    label: 'Art & Culture',
    topics: {
      classical: {
        label: 'Classical & Renaissance Art',
        levels: [
          {
            id: 'a1', name: 'Renaissance Masters', sub: 'Leonardo, Michelangelo & Raphael',
            training: [
              { image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=75', title: 'The Italian Renaissance', text: 'The Renaissance ("rebirth") began in 14th-century Florence, Italy. It marked a return to classical Greek and Roman ideals, combined with new humanism — placing humans at the centre of the universe. Key patrons like the Medici family funded artists, philosophers, and scientists.', highlight: 'The Medici family of Florence spent more on art (in today\'s money) than any other private patrons in history.' },
              { image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=75', title: 'The Three Giants', text: 'Leonardo da Vinci was the ultimate Renaissance man — painter, sculptor, architect, scientist, and inventor. Michelangelo painted the Sistine Chapel ceiling (1508–12) and sculpted David. Raphael was renowned for his harmony and clarity, particularly his Madonnas and the School of Athens fresco.', highlight: 'Michelangelo spent four years painting the Sistine Chapel ceiling, lying on scaffolding 20 metres high.' },
            ],
            questions: [
              { type: 'mcq', question: 'The Mona Lisa was painted by:', options: ['Raphael', 'Michelangelo', 'Leonardo da Vinci', 'Botticelli'], correct: 2, explain: 'Leonardo da Vinci painted the Mona Lisa circa 1503–19. It is displayed in the Louvre, Paris.' },
              { type: 'mcq', question: 'Michelangelo painted which ceiling?', options: ['The Vatican Palace', 'The Sistine Chapel', 'Santa Maria del Fiore', 'The Uffizi Gallery'], correct: 1, explain: 'Michelangelo painted the Sistine Chapel ceiling (1508–1512) for Pope Julius II.' },
              { type: 'match', instruction: 'Match the artwork to its artist.', pairs: [{ left: 'School of Athens', right: 'Raphael' }, { left: 'The Birth of Venus', right: 'Botticelli' }, { left: 'The Last Supper', right: 'Leonardo da Vinci' }, { left: 'David (sculpture)', right: 'Michelangelo' }] },
              { type: 'mcq', question: 'What does "sfumato" mean in Renaissance painting?', options: ['Bright colour contrast', 'Smoky, blurred outlines', 'Geometric perspective', 'Gold leaf application'], correct: 1, explain: 'Sfumato (Italian for "smoky") is Leonardo\'s technique of blending tones without lines, giving subjects a hazy atmosphere.' },
              { type: 'mcq', question: 'The Medici family were patrons based in:', options: ['Rome', 'Venice', 'Florence', 'Milan'], correct: 2, explain: 'The Medici were the most powerful family in Florence, funding Leonardo, Botticelli, and Michelangelo among others.' },
              { type: 'mcq', question: 'Raphael died at age:', options: ['27', '37', '47', '57'], correct: 1, explain: 'Raphael died on April 6, 1520, his 37th birthday, possibly from a fever.' },
              { type: 'match', instruction: 'Match the Renaissance technique to its definition.', pairs: [{ left: 'Chiaroscuro', right: 'Light and shadow contrast' }, { left: 'Sfumato', right: 'Soft, blurred outlines' }, { left: 'Fresco', right: 'Paint on wet plaster' }, { left: 'Trompe-l\'œil', right: 'Optical illusion of 3D' }] },
            ],
          },
        ],
      },
      modern_art: {
        label: 'Modern & Contemporary Art',
        levels: [
          {
            id: 'a2', name: 'Impressionism & Post-Impressionism', sub: 'Monet, Renoir, Van Gogh & Cézanne',
            training: [
              { image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&q=75', title: 'The Impressionist Revolution', text: 'Impressionism emerged in France in the 1860s–70s. Claude Monet, Pierre-Auguste Renoir, and Edgar Degas rejected the formal constraints of academic painting, instead capturing fleeting moments through loose brushwork and an emphasis on light. The movement\'s name came from Monet\'s painting "Impression, Sunrise" (1872).', highlight: 'The first Impressionist exhibition in 1874 was ridiculed by critics — the term "Impressionism" was originally an insult.' },
              { image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=75', title: 'Post-Impressionism', text: 'Post-Impressionists built on Impressionism while adding personal expression. Cézanne\'s geometric forms influenced Cubism; Van Gogh\'s emotional intensity and visible brushstrokes influenced Expressionism; Gauguin\'s bold colours influenced Fauvism.', highlight: 'Van Gogh sold only ONE painting during his lifetime — "The Red Vineyard" for 400 francs in 1890.' },
            ],
            questions: [
              { type: 'mcq', question: 'The Impressionist movement began in which country?', options: ['England', 'Germany', 'France', 'Italy'], correct: 2, explain: 'Impressionism emerged in France in the 1860s–70s, centered in Paris.' },
              { type: 'mcq', question: 'Cézanne is considered the "Father of":', options: ['Surrealism', 'Abstract Expressionism', 'Modern Art/Cubism', 'Pop Art'], correct: 2, explain: 'Cézanne\'s geometric forms directly inspired Picasso and Braque\'s Cubism.' },
              { type: 'match', instruction: 'Match artwork to its artist.', pairs: [{ left: 'A Sunday on La Grande Jatte', right: 'Georges Seurat' }, { left: 'The Scream', right: 'Edvard Munch' }, { left: 'Starry Night', right: 'Vincent van Gogh' }, { left: 'Mont Sainte-Victoire', right: 'Paul Cézanne' }] },
              { type: 'mcq', question: 'Salvador Dalí was associated with which movement?', options: ['Cubism', 'Fauvism', 'Surrealism', 'Expressionism'], correct: 2, explain: 'Dalí was a central figure of Surrealism, exploring dreams and the unconscious.' },
              { type: 'mcq', question: 'Van Gogh\'s "Starry Night" is held at:', options: ['Louvre, Paris', 'MoMA, New York', 'Uffizi, Florence', 'Tate Modern, London'], correct: 1, explain: 'The Starry Night is at the Museum of Modern Art (MoMA) in New York.' },
            ],
          },
        ],
      },
    },
  },
  geography: {
    label: 'World Geography',
    topics: {
      countries: {
        label: 'Countries & Capitals',
        levels: [
          {
            id: 'g1', name: 'European Capitals', sub: 'From London to Lisbon',
            training: [
              { image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=75', title: 'Europe\'s Great Capitals', text: 'Europe has 44 countries and some of the world\'s most iconic capitals. Paris (France), Berlin (Germany), Madrid (Spain), Rome (Italy), and Vienna (Austria) are centres of culture and history.', highlight: 'Vatican City is the world\'s smallest country (0.44 km²), located within Rome, Italy.' },
              { image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=75', title: 'Northern & Eastern Europe', text: 'Scandinavian capitals include Oslo (Norway), Stockholm (Sweden), Helsinki (Finland), and Copenhagen (Denmark). Eastern Europe features Warsaw (Poland), Prague (Czech Republic), Budapest (Hungary).', highlight: 'Stockholm is built on 14 islands and has over 57 bridges.' },
            ],
            questions: [
              { type: 'mcq', question: 'What is the capital of Germany?', options: ['Munich', 'Hamburg', 'Frankfurt', 'Berlin'], correct: 3, explain: 'Berlin has been Germany\'s capital since 1990 reunification.' },
              { type: 'mcq', question: 'What is the capital of Austria?', options: ['Salzburg', 'Vienna', 'Graz', 'Innsbruck'], correct: 1, explain: 'Vienna (Wien) is Austria\'s capital and largest city.' },
              { type: 'match', instruction: 'Match country to its capital.', pairs: [{ left: 'Poland', right: 'Warsaw' }, { left: 'Hungary', right: 'Budapest' }, { left: 'Czech Republic', right: 'Prague' }, { left: 'Romania', right: 'Bucharest' }] },
              { type: 'mcq', question: 'Stockholm is the capital of:', options: ['Norway', 'Denmark', 'Finland', 'Sweden'], correct: 3, explain: 'Stockholm is the capital and largest city of Sweden.' },
              { type: 'mcq', question: 'What country surrounds Vatican City?', options: ['San Marino', 'Italy', 'France', 'Monaco'], correct: 1, explain: 'Vatican City is an enclave within Rome, Italy.' },
              { type: 'mcq', question: 'What is the capital of Portugal?', options: ['Porto', 'Faro', 'Coimbra', 'Lisbon'], correct: 3, explain: 'Lisbon (Lisboa) is the capital and largest city of Portugal.' },
              { type: 'match', instruction: 'Match European capital to its river.', pairs: [{ left: 'London', right: 'Thames' }, { left: 'Paris', right: 'Seine' }, { left: 'Budapest', right: 'Danube' }, { left: 'Vienna', right: 'Danube' }] },
              { type: 'mcq', question: 'What is the capital of Greece?', options: ['Thessaloniki', 'Heraklion', 'Athens', 'Corinth'], correct: 2, explain: 'Athens (Athinai) is the capital and most populous city of Greece.' },
            ],
          },
          {
            id: 'g3', name: 'Global Capitals', sub: 'Asia, Africa & the Americas',
            training: [
              { image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=75', title: 'Asian Capitals', text: 'Asia\'s major capitals span enormous diversity. Tokyo (Japan), Beijing (China), New Delhi (India), Bangkok (Thailand), and Seoul (South Korea) are among the world\'s most populous.', highlight: 'Tokyo Metropolitan area is the world\'s most populous city with over 37 million people.' },
              { image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=75', title: 'The Americas', text: 'Washington D.C. (USA), Ottawa (Canada), Mexico City (Mexico), Brasilia (Brazil), and Buenos Aires (Argentina) anchor the continent. Brasilia was purpose-built as a capital city in 1960.', highlight: 'Brasilia replaced Rio de Janeiro as Brazil\'s capital in 1960 — designed by Oscar Niemeyer.' },
            ],
            questions: [
              { type: 'mcq', question: 'What is the capital of Japan?', options: ['Osaka', 'Kyoto', 'Yokohama', 'Tokyo'], correct: 3, explain: 'Tokyo has been Japan\'s capital since 1869 when the imperial court moved from Kyoto.' },
              { type: 'mcq', question: 'The capital of Australia is:', options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'], correct: 3, explain: 'Canberra, purpose-built as a compromise between Sydney and Melbourne, is Australia\'s capital.' },
              { type: 'match', instruction: 'Match country to its capital.', pairs: [{ left: 'Brazil', right: 'Brasilia' }, { left: 'Canada', right: 'Ottawa' }, { left: 'Argentina', right: 'Buenos Aires' }, { left: 'South Korea', right: 'Seoul' }] },
              { type: 'mcq', question: 'What is the capital of India?', options: ['Mumbai', 'Kolkata', 'Chennai', 'New Delhi'], correct: 3, explain: 'New Delhi is the capital of India and part of the National Capital Territory of Delhi.' },
              { type: 'mcq', question: 'The capital of Egypt is:', options: ['Alexandria', 'Luxor', 'Cairo', 'Giza'], correct: 2, explain: 'Cairo (Al-Qahirah) is Egypt\'s capital and largest city, home to over 20 million.' },
              { type: 'mcq', question: 'Ottawa is the capital of:', options: ['USA', 'Australia', 'Canada', 'New Zealand'], correct: 2, explain: 'Ottawa, on the Ontario-Quebec border, has been Canada\'s capital since 1857.' },
              { type: 'match', instruction: 'Match Middle Eastern country to its capital.', pairs: [{ left: 'Saudi Arabia', right: 'Riyadh' }, { left: 'UAE', right: 'Abu Dhabi' }, { left: 'Turkey', right: 'Ankara' }, { left: 'Israel', right: 'Jerusalem' }] },
            ],
          },
        ],
      },
      landmarks: {
        label: 'World Landmarks',
        levels: [
          {
            id: 'g2', name: 'Seven Wonders', sub: 'Ancient & modern marvels',
            training: [
              { image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=75', title: 'Ancient Wonders', text: 'The Seven Wonders of the Ancient World included the Great Pyramid of Giza (the only survivor), the Hanging Gardens of Babylon, the Temple of Artemis, and the Colossus of Rhodes.', highlight: 'The Great Pyramid remained the world\'s tallest structure for 3,800 years until Lincoln Cathedral in 1311.' },
              { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75', title: 'New Seven Wonders', text: 'In 2007, a global vote chose the New Seven Wonders: the Great Wall of China, the Colosseum, Machu Picchu, Christ the Redeemer, Taj Mahal, Chichen Itza, and Petra.', highlight: 'Over 100 million people voted in the 2007 New Seven Wonders poll.' },
            ],
            questions: [
              { type: 'mcq', question: 'Which is the only surviving Ancient Wonder?', options: ['Temple of Artemis', 'Hanging Gardens', 'Great Pyramid of Giza', 'Lighthouse of Alexandria'], correct: 2, explain: 'The Great Pyramid of Giza is the only ancient wonder still standing.' },
              { type: 'mcq', question: 'Machu Picchu is located in:', options: ['Mexico', 'Brazil', 'Bolivia', 'Peru'], correct: 3, explain: 'Machu Picchu is in the Andes of Peru, built by the Inca c.1450.' },
              { type: 'mcq', question: 'The Taj Mahal was built by Mughal emperor:', options: ['Akbar', 'Humayun', 'Shah Jahan', 'Aurangzeb'], correct: 2, explain: 'Shah Jahan built the Taj Mahal (1632–1653) as a mausoleum for his wife Mumtaz Mahal.' },
              { type: 'match', instruction: 'Match landmark to its country.', pairs: [{ left: 'Colosseum', right: 'Italy' }, { left: 'Chichen Itza', right: 'Mexico' }, { left: 'Petra', right: 'Jordan' }, { left: 'Christ the Redeemer', right: 'Brazil' }] },
              { type: 'mcq', question: 'The Great Wall of China stretches approximately:', options: ['5,000 km', '13,000 km', '21,000 km', '3,000 km'], correct: 2, explain: 'Including all its sections, the Great Wall totals about 21,196 km.' },
              { type: 'mcq', question: 'The Burj Khalifa is located in:', options: ['Saudi Arabia', 'Qatar', 'Dubai, UAE', 'Abu Dhabi, UAE'], correct: 2, explain: 'The Burj Khalifa (828m) is in Dubai, United Arab Emirates.' },
              { type: 'mcq', question: 'The Eiffel Tower was built for which exposition?', options: ['1876 Centennial', '1889 World\'s Fair', '1900 Exposition Universelle', '1904 World\'s Fair'], correct: 1, explain: 'The Eiffel Tower was built as the entrance arch for the 1889 World\'s Fair in Paris.' },
              { type: 'match', instruction: 'Match engineering wonder to its location.', pairs: [{ left: 'Channel Tunnel', right: 'England-France' }, { left: 'Panama Canal', right: 'Panama' }, { left: 'Golden Gate Bridge', right: 'San Francisco, USA' }, { left: 'Sydney Opera House', right: 'Australia' }] },
            ],
          },
        ],
      },
    },
  },
};

export default CONTENT;
