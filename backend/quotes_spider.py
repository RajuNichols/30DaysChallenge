from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = ['https://pubmed.ncbi.nlm.nih.gov/?term=Anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nervousness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=angst&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=uneasiness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Stress&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=anticipatory+anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=jitters&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=tension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=apprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=discomfort&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=anguish&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fear&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=paranoia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=anger&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=restlessness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=unhappiness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=pain&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=uncertainty&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=dread&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=generalized+anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=hyper+arousal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Productivity&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=operational+efficiency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=efficiency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effectiveness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=workflow&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=incentive&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=competitive&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=curly+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=anagen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=catagen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=telogen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=hair+regrowth&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=eyelash+regrowth&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=chemo+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=frizzy+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=gray+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=wavy+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=facial+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=hair+oiling&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=castor+oil&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=rosemary+oil&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=dry+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=rice+water&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=restful+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=restorative+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nap&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=wakings&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fitful+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=snore&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=awake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=asleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=daytime+naps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=bedtime&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=REM+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Procrastination&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=laziness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Perfectionism&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=boredom&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=inertia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=slothfulness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=indolence&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Phobias&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=claustrophobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=agoraphobia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=acrophobia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=disorientation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Nutrition&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=eating+habits&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=dietary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=balanced+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fat+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=calorie+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=calorie+intake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=vegetarian+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=carbohydrate+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=vegan+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=carbohydrate+intake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=detox+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=glycemic+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=macrobiotic+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nutritious&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=multivitamins&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=paleo&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=keto+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=macronutrients&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Self+care&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=caring&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=habilitative&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=organize&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=cleaning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=reablement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=functionally+impaired&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=mental+health&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=loneliness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=existential+dread&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Money&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=thrifty&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=frugal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=save+money&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=retirement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=personal+finances&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=recession&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fiscal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Studying&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=language&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nonnative+speakers&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=language+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=literacy&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=vocabulary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=grammar+comprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=learning+grammar&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=language+comprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=foreign+langauge+fluency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=biliterate&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=rote+memorisation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=converse+fluently&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=kinesthetic+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=vocabulary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=visual+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=auditory+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=memorisation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=spaced+recall&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Fitness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=exercise&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=compound&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=cardio+toning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=plyometric+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=calisthenics&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=stretching&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=yoga+asana&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=posture&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=yogic+breathing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Breathing+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=mindfulness+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=isometric+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Tai+Chi&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=weightlifting&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=pushups&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=situps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=anaerobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=aerobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=boxercise&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=workout&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=muscle+tone&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=conditioning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fitness+regimen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=pilates&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=yoga&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Sports+performance&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=tendon+strengthening&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=stretch+muscle+fibers&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=muscle+protein+synthesis&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=creatine+monohydrate&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=L-citrulline&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=betaine+anhydrous&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Health&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=breathing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=breath&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=perspire&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Inhale+deeply&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Breathe&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=illness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=sick&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=tiredness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Sore+throats&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=diarrhea&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=bloating&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=sore+throat&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fever&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=tooth+ache&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=colds+flus&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=headache&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=migraine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=herbal+remedies&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=acupuncture&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=meditation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=runny+nose&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nosebleed&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=homeopathic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=elderberry&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=herbal+supplement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=workaholism&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=mental+illness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=depression&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=healthcare&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=wellness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=wellbeing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=preventive+medicine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=mindfulness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=nutrition&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=medical&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=preventative+medicine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=sensory+overload&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=hypervigilance&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=vertigo&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=efficacy+dysmenorrhea&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=dysmenorrhea&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=PMS&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Menstrual+cramps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Skin&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Cellulite&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Dry+Skin&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Dark+Circles&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Skin+Brightening&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Skin+Care&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=fine+lines&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=wrinkles&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Blemish&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Acne&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Eczema&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Skin+redness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=red+light+therapy&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=retinol&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Centella+asiatica&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=benzoyl+peroxide&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=salicylic+acid&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nervousness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+angst&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+uneasiness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Stress&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+anticipatory+anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+jitters&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+tension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+apprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+discomfort&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+anguish&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fear&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+paranoia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+anger&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+restlessness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+unhappiness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+pain&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+uncertainty&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+dread&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+generalized+anxiety&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+hyper+arousal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Productivity&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+operational+efficiency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+efficiency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Effectiveness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+workflow&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+incentive&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+competitive&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+curly+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+anagen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+catagen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+telogen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+hair+regrowth&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+eyelash+regrowth&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+chemo+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+frizzy+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+gray+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+wavy+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+facial+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+hair+oiling&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+castor+oil&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+rosemary+oil&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+dry+hair&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+rice+water&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+restful+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+restorative+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nap&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+wakings&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fitful+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+snore&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+awake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+asleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+daytime+naps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+bedtime&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+REM+sleep&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Procrastination&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+laziness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Perfectionism&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+boredom&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+inertia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+slothfulness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+indolence&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Phobias&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+claustrophobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+agoraphobia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+acrophobia&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+disorientation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Nutrition&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+eating+habits&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+dietary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+balanced+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fat+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+calorie+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+calorie+intake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+vegetarian+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+carbohydrate+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+vegan+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+carbohydrate+intake&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+detox+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+glycemic+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+macrobiotic+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nutritious&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+multivitamins&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+paleo&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+keto+diet&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+macronutrients&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Self+care&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+caring&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+habilitative&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+organize&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+cleaning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+reablement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+functionally+impaired&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+mental+health&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+loneliness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+existential+dread&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Money&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+thrifty&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+frugal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+save+money&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+retirement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+personal+finances&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+recession&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fiscal&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Studying&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+language&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nonnative+speakers&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+language+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+literacy&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+vocabulary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+grammar+comprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+learning+grammar&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+language+comprehension&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+foreign+langauge+fluency&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+biliterate&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+rote+memorisation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+converse+fluently&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+kinesthetic+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+vocabulary&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+visual+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+auditory+learning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+memorisation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+spaced+recall&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Fitness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+exercise&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+compound&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+cardio+toning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+plyometric+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+calisthenics&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+stretching&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+yoga+asana&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+posture&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+yogic+breathing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Breathing+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+mindfulness+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+isometric+exercises&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Tai+Chi&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+weightlifting&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+pushups&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+situps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+anaerobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+aerobic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+boxercise&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+workout&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+muscle+tone&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+conditioning&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fitness+regimen&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+pilates&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+yoga&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Sports+performance&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+tendon+strengthening&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+stretch+muscle+fibers&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+muscle+protein+synthesis&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+creatine+monohydrate&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+L-citrulline&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+betaine+anhydrous&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Health&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+breathing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+breath&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+perspire&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Inhale+deeply&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Breathe&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+illness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+sick&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+tiredness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Sore+throats&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+diarrhea&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+bloating&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+sore+throat&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fever&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+tooth+ache&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+colds+flus&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+headache&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+migraine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+herbal+remedies&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+acupuncture&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+meditation&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+runny+nose&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nosebleed&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+homeopathic&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+elderberry&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+herbal+supplement&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+workaholism&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+mental+illness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+depression&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+healthcare&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+wellness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+wellbeing&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+preventive+medicine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+mindfulness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+nutrition&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+medical&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+preventative+medicine&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+sensory+overload&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+hypervigilance&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+vertigo&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+dysmenorrhea&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+PMS&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Menstrual+cramps&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Skin&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Cellulite&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Dry+Skin&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Dark+Circles&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Skin+Brightening&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Skin+Care&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+fine+lines&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+wrinkles&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Blemish&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Acne&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Eczema&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Skin+redness&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+red+light+therapy&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+retinol&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+Centella+asiatica&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+benzoyl+peroxide&filter=simsearch2.ffrft',
 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+salicylic+acid&filter=simsearch2.ffrft']
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for re in response.css('.docsum-pmid').getall():
            ind = re.find(">")
            re = re[ind+1:]
            re = re[:re.find("<")]

            # filename = 'healthpmids.txt'
            # with Path(filename).open("a") as f:
            #     f.write(re+ ",")
            
            # Path(filename).write_bytes(re)

            yield{"ids": re}

