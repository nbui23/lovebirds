import SwiftUI

struct AuthView: View {
    
    private let authService = AuthService.shared
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Welcome to Lovebirds")
                    .font(.largeTitle)
                    .padding(.bottom, 20)
                
                Button(action: {
                    // Handle the Login with Spotify action.
                    authService.loginWithSpotify { result in
                        switch result {
                        case .success:
                            // Handle successful login.
                            print("Logged in successfully.")
                        case .failure(let error):
                            // Handle login error.
                            print("Error logging in: \(error.localizedDescription)")
                        }
                    }
                }) {
                    Text("Login with Spotify")
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(8)
                }
                
                Spacer()
            }
            .padding()
            .navigationTitle("Authentication")
        }
    }
}

struct AuthView_Previews: PreviewProvider {
    static var previews: some View {
        AuthView()
    }
}
