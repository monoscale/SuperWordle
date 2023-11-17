namespace SuperWordle.Models {
    public class WordleWord {

        public WordleWord(string word) {
            Characters = word.ToCharArray();
        }


        private char[] _characters;
        public char[] Characters {
            get {
                return _characters;
            }
            set {
                if (value.Length != 5) {
                    throw new ArgumentException("A wordle word must contain exactly 5 characters.");
                }
                _characters = value;
            }
        }


    }
}
