namespace SuperWordle.Models {
    public class WordleWord {

        public static int WORD_LENGTH = 5;

        public WordleWord(string word) {
            Characters = word.ToCharArray();
        }


        private char[] _characters;
        public char[] Characters {
            get {
                return _characters;
            }
            set {
                if (value.Length != WORD_LENGTH) {
                    throw new ArgumentException("A wordle word must contain exactly 5 characters.");
                }
                _characters = value;
            }
        }


    }
}
