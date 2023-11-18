using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SuperWordle.Pages {
    public class IndexModel : PageModel {
        
        public int WordlesToSolve { get; set; }
        public int MaximumAttempts { get; set; }

        public IndexModel() {
            WordlesToSolve = 4;
            MaximumAttempts = 20;
        }

        public void OnGet() {

        }
    }
}