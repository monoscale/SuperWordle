using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SuperWordle.Pages {
    public class IndexModel : PageModel {
        
        public int WordlesToSolve { get; set; }
        public int MaximumAttempts { get; set; }

        public IndexModel() {
            WordlesToSolve = 2;
            MaximumAttempts = 6;
        }

        public void OnGet() {

        }
    }
}